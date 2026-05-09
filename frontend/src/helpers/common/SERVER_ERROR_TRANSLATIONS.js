const SERVER_ERROR_TRANSLATIONS = {
    "User doesn't have access to this role.":
        "Người dùng không có quyền truy cập vai trò này.",

    "Invalid credentials.":
        "Email hoặc mật khẩu không chính xác.",

    "User account is inactive.":
        "Tài khoản người dùng đã bị vô hiệu hóa.",
}

function removeWrappingQuotes(message) {
    if (typeof message !== "string") return message

    return message.replace(/^["']|["']$/g, "")
}

export function translateServerError(message) {
    const cleanMessage = removeWrappingQuotes(message)

    return SERVER_ERROR_TRANSLATIONS[cleanMessage] || cleanMessage
}