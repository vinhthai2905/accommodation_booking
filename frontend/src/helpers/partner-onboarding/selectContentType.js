export function selectContentType(data, headers) {
    let body

    if (data instanceof FormData) {
        delete headers["Content-Type"]
        body = data
    } else {
        body = JSON.stringify(data)
    }

    return body
}