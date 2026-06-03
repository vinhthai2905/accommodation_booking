import json
import logging
import os

# Set up a specific logger for API logs
api_logger = logging.getLogger('bookingAPI_logger')
api_logger.setLevel(logging.INFO)

# Create file handler which logs even debug messages
log_file_path = os.path.join(os.path.dirname(__file__), 'bookingAPI.log')
file_handler = logging.FileHandler(log_file_path, encoding='utf-8')
file_handler.setLevel(logging.INFO)

# Create formatter and add it to the handler
formatter = logging.Formatter('%(asctime)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
file_handler.setFormatter(formatter)

# Add the handler to the logger
if not api_logger.handlers:
    api_logger.addHandler(file_handler)

class APILogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path.startswith('/api/'):
            return self.get_response(request)

        method = request.method
        url = request.get_full_path()
        
        payload = None
        if method in ['POST', 'PUT', 'PATCH']:
            try:
                if request.body:
                    payload = json.loads(request.body.decode('utf-8'))
            except (json.JSONDecodeError, UnicodeDecodeError):
                payload = "Non-JSON or unreadable payload"
        
        params = dict(request.GET) if request.GET else None
        
        # Build request log string
        req_log = f"[REQUEST] {method} {url}"
        if params:
            req_log += f"\n  Params: {params}"
        if payload:
            if isinstance(payload, (dict, list)):
                pretty_payload = json.dumps(payload, ensure_ascii=False, indent=2)
                indented_payload = "\n".join(f"    {line}" for line in pretty_payload.splitlines())
                req_log += f"\n  Payload:\n{indented_payload}"
            else:
                req_log += f"\n  Payload: {payload}"
            
        api_logger.info(req_log)

        response = self.get_response(request)

        status_code = response.status_code
        
        response_data = None
        if hasattr(response, 'content'):
            try:
                content_type = response.get('Content-Type', '')
                if 'application/json' in content_type:
                    response_data = json.loads(response.content.decode('utf-8'))
            except (json.JSONDecodeError, UnicodeDecodeError):
                pass
        
        # Build response log string
        res_log = f"[RESPONSE] {status_code} {url}"
        if status_code >= 400:
            res_log = f"[ERROR] {status_code} {url}"
            
        if response_data:
            pretty_data = json.dumps(response_data, ensure_ascii=False, indent=2)
            indented_data = "\n".join(f"    {line}" for line in pretty_data.splitlines())
            res_log += f"\n  Response Data:\n{indented_data}"
            
        api_logger.info(res_log)
        api_logger.info("-" * 50) # separator between requests

        return response
