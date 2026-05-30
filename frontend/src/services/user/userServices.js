import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"

const apiURL = import.meta.env.VITE_API_URL

const headers = buildTokenHeader()

export const fetchUserProfile = async () => {
    const response = await fetch(`${apiURL}/api/public/users/me`, {
        method: "GET",
        headers,
    })
    
    if (!response.ok) {
        throw new Error('Tải thông tin cá nhân thất bại.')
    }

    return response.json()
}

export const updateUserProfile = async (data) => {
    const response = await fetch(`${apiURL}/api/public/users/me`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data)
    })
    
    if (!response.ok) {
        throw new Error('Cập nhật thông tin thất bại.')
    }

    return response.json()
}
