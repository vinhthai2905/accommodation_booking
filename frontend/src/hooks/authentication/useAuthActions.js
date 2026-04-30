import toast from "react-hot-toast"

import { logoutUser, fetchUser } from "../../services/authAPI"


export default function useAuthActions(setUserState) {
    const setAccessToken = (token) => {
        if (!token)
            throw new Error("Token không được cấp.")

        localStorage.setItem("access_token", token)
    }

    const setCurrentUser = (name, email) => {
        if (!name || !email)
            throw new Error("Thông tin không tồn tại")

        setUserState({
            name,
            email
        })
    }

    const setAuthUserState = (access_token, name, email) => {
        setAccessToken(access_token),
            setCurrentUser(name, email)
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

            setCurrentUser(responseData.name, responseData.email)

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