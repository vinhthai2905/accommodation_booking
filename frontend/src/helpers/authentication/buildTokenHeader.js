export const buildTokenHeader = () => {
    const token = localStorage.getItem("access_token")
    const headers = {
        "Content-Type": "application/json"
    }

    if (token)
        headers["Authorization"] = `Bearer ${token}`

    return headers
}