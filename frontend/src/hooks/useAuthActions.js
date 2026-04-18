import toast from "react-hot-toast"
import { useCallback } from "react"

import { logoutUser, fetchUser } from "../services/authAPI"


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

    const clearAuthState = async () => {
        try {
            await logoutUser()

            localStorage.removeItem("access_token")

            setUserState(null)
        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi. ${error}`)
        }
    }

    const fetchUserState = async () => {
        try {
            const response = await fetchUser()
            const responseData = await response.json()

            setCurrentUser(responseData.name, responseData.email)

            return responseData

        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi. ${error}`)
        }
    }

    return {
        clearAuthState,
        fetchUserState,
        setAccessToken,
        setCurrentUser
    }
}