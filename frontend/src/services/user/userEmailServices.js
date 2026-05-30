import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"

const apiURL = import.meta.env.VITE_API_URL

export const sendVerificationEmail = async () => {
    const response = await fetch(`${apiURL}/api/auth/user/send/email-verification`, {
        method: "POST",
        headers: buildTokenHeader(),
    })
    
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || 'Gửi yêu cầu xác minh email thất bại.')
    }

    return response.json()
}
