import json
import logging
import os

def setup_logger(name, log_file):
    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    log_file_path = os.path.join(os.path.dirname(__file__), log_file)
    file_handler = logging.FileHandler(log_file_path, encoding='utf-8')
    file_handler.setLevel(logging.INFO)
    formatter = logging.Formatter('%(asctime)s - %(message)s', datefmt='%Y-%m-%d %H:%M:%S')
    file_handler.setFormatter(formatter)
    if not logger.handlers:
        logger.addHandler(file_handler)
    return logger

crud_logger = setup_logger('crudAPI_logger', 'commonCRUD.log')
payment_logger = setup_logger('zalopayPayment_logger', 'zalopayPayment.log')
refund_logger = setup_logger('zalopayRefund_logger', 'zalopayRefund.log')

class APILogMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path.startswith('/api/'):
            return self.get_response(request)

        path = request.path
        method = request.method
        
        if (path == '/api/hotel/booking' and method == 'POST') or '/api/payments/zalopay' in path:
            current_logger = payment_logger
        elif '/cancel' in path and method in ['POST', 'PATCH', 'PUT']:
            current_logger = refund_logger
        else:
            current_logger = crud_logger

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
            
        current_logger.info(req_log)

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
            
        current_logger.info(res_log)
        current_logger.info("-" * 50) # separator between requests

        return response
