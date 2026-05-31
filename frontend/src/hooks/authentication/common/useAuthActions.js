import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"

import { logoutAuthUser, fetchAuthUser } from "../../../services/authentication/authServices"


export default function useAuthActions(setUserState, queryClient) {
    const setAccessToken = (token) => {
        if (!token)
            throw new Error("Token không được cấp.")

        localStorage.setItem("access_token", token)
    }

    const setCurrentUser = (email, personal_info, role) => {
        if (!personal_info || !email || !role)
            throw new Error("Thông tin không tồn tại")

        setUserState({
            email,
            personal_info,
            role
        })
    }

    const setAuthUserState = (access_token, email, personal_info, role) => {
        queryClient.clear()
        setAccessToken(access_token)
        setCurrentUser(email, personal_info, role)
    }

    const clearAuthUserState = async () => {
        try {
            await logoutAuthUser()
        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi. ${error}`)
        }
        finally {
            localStorage.removeItem("access_token")
            queryClient.clear()
            setUserState(null)
        }
    }

    const fetchAuthUserState = async () => {
        try {
            const response = await fetchAuthUser()

            if (!response.ok) {
                if (response.status === 401) {
                    localStorage.removeItem("access_token")
                    queryClient.clear()
                    setUserState(null)
                    return null
                }
                throw new Error(`Response status: ${response.status}`)
            }


            const responseData = await response.json()
            
            setCurrentUser(
                responseData.user.email, 
                responseData.user.personal_info, 
                responseData.user.role
            )

            return responseData

        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi. ${error.message || error}`)
            return null
        }
    }

    return {
        setAuthUserState,
        fetchAuthUserState,
        clearAuthUserState,
    }
}