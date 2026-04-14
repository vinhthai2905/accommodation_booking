import { useState, useCallback } from "react";

import { AuthUserContext } from "./AuthUserContext";

import { toast } from "react-hot-toast"

import { fetchUser, logoutUser } from "../services/authAPI";

export default function AuthUserProvider({ children }) {
    const [user, setUserState] = useState(null)

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

    const fetchUserState = useCallback(async () => {
        try {
            const response = await fetchUser()
            const responseData = await response.json()

            setCurrentUser(responseData.name, responseData.email)
        }
        catch (error) {
            toast.error(`Hệ thống xảy ra lỗi. ${error}`)
        }
    }, [])

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

    const authUserContext = {
        user,
        setAccessToken,
        setCurrentUser,
        fetchUserState,
        clearAuthState,
        isAuthenticated: !!user,
    }

    return (
        <AuthUserContext value={authUserContext}>
            {children}
        </AuthUserContext>
    )

}