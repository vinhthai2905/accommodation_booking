import {  useState } from "react"

import { AuthUserContext } from "./AuthUserContext"
import { useQueryClient } from "@tanstack/react-query"

import useAuthFetchUser from "../../hooks/authentication/common/useAuthFetchUser"
import useAuthActions from "../../hooks/authentication/common/useAuthActions"

export default function AuthUserProvider({ children }) {
    const queryClient = useQueryClient()
    const [user, setUserState] = useState(null)
    const { setAuthUserState, fetchAuthUserState, clearAuthUserState } = useAuthActions(setUserState, queryClient)
    const { isPending, error, data, accessToken } = useAuthFetchUser(fetchAuthUserState)

    const authUserContext = {
        user,
        isFetchingUser: isPending,
        setAuthUserState,
        clearAuthUserState,
        isAuthenticated: !!user,
        isVerified: !!user?.verified_at,
        accessToken
    }

    console.log(user)

    return (
        <AuthUserContext value={authUserContext}>
            {children}
        </AuthUserContext>
    )

}

