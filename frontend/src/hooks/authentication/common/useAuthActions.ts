import toast from "react-hot-toast"
import axios, { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

import { logoutAuthUser, fetchAuthUser, refreshAuthUser } from "../../../services/authentication/authServices"

import { ErrorFetchUserResponse } from "../../../types/authentication/api/apiErrorResponse"
import { isTokenExpired } from "../../../helpers/authentication/inspectAPIMessage"

export default function useAuthActions(setUserState) {
    const queryClient = useQueryClient()

    const setAccessToken = (token) => {
        if (!token)
            throw new Error("Token không được cấp.")

        localStorage.setItem("access_token", token)
    }

    const setCurrentUser = (email, personal_info, role, verified_at) => {
        if (!email || !role)
            throw new Error("Thông tin không tồn tại")

        setUserState({
            email,
            personal_info: personal_info || {},
            role,
            verified_at
        })
    }

    const setAuthUserState = (access_token, email, personal_info, role, verified_at) => {
        queryClient.clear()
        setAccessToken(access_token)
        setCurrentUser(email, personal_info, role, verified_at)
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

    // const refreshAuthUser = async () => {
    //     try {
    //         const responseDta = await 
    //     }
    // }

    const fetchAuthUserState = async () => {
        try {
            const responseData = await fetchAuthUser()
            setCurrentUser(
                responseData.user.email,
                responseData.user.personal_info,
                responseData.user.role,
                responseData.user.verified_at
            )
            return responseData
        }
        catch (error) {
            if (axios.isAxiosError<ErrorFetchUserResponse>(error)) {
                if (isTokenExpired(error)) {
                    const responseData = await refreshAuthUser()
                    
                }

                // toast.error(`Hệ thống xảy ra lỗi. ${error.message || error}`)
            }

        }
    }

    return {
        setAuthUserState,
        fetchAuthUserState,
        clearAuthUserState,
    }
}