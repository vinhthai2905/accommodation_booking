import toast from "react-hot-toast"

import { logoutUser, fetchUser } from "../../services/authServices"


export default function useAuthActions(setUserState) {
    const setAccessToken = (token) => {
        if (!token)
            throw new Error("Token không được cấp.")

        localStorage.setItem("access_token", token)
    }

    const setCurrentUser = (email, personal_info) => {
        if (!personal_info || !email)
            throw new Error("Thông tin không tồn tại")

        setUserState({
            email,
            personal_info
        })
    }

    const setAuthUserState = (access_token, email, personal_info) => {
        setAccessToken(access_token),
        setCurrentUser(email, personal_info)
    }

    const clearAuthUserState = async () => {
        try {
            await logoutUser()

            localStorage.removeItem("access_token")

            setUserState(null)
        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi. ${error}`)
        }
    }

    const fetchAuthUserState = async () => {
        try {
            const response = await fetchUser()

            if (!response.ok)
                throw new Error(`Response status: ${response.status}`)

            const responseData = await response.json()

            setCurrentUser(responseData.user.email, responseData.user.personal_info)

            return responseData

        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi. ${error}`)
        }
    }

    return {
        setAuthUserState,
        fetchAuthUserState,
        clearAuthUserState,
    }
}