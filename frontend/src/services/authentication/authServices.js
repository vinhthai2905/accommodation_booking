import bookingAPI from "../base/bookingAPI"

export const fetchAuthUser = async () => {
    const { data } = await bookingAPI.post(`/api/auth/user/refresh`, {}, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
            "Content-Type": "application/json"
        },
    })
    return data
}

export const loginAuthUser = async (data) => {
    const response = await bookingAPI.post(`/api/auth/user/login`, data, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return response.data
}

export const logoutAuthUser = async () => {
    const { data } = await bookingAPI.post(`/api/auth/user/logout`, {}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return data
}

export const verifyEmail = async (uidb64, token) => {
    const { data } = await bookingAPI.post(`/api/auth/user/verify-email/${uidb64}/${token}`, {}, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return data
}
