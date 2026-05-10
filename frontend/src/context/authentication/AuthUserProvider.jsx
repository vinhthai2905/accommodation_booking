import {  useState } from "react"

import { AuthUserContext } from "./AuthUserContext"

import useAuthFetchUser from "../../hooks/authentication/common/useAuthFetchUser"
import useAuthActions from "../../hooks/authentication/common/useAuthActions"

export default function AuthUserProvider({ children }) {
    const [user, setUserState] = useState(null)
    const { setAuthUserState, fetchAuthUserState, clearAuthUserState } = useAuthActions(setUserState)
    const { isPending, error, data } = useAuthFetchUser(fetchAuthUserState)

    const authUserContext = {
        user,
        isFetchingUser: isPending,
        setAuthUserState,
        clearAuthUserState,
        isAuthenticated: !!user,
    }

    return (
        <AuthUserContext value={authUserContext}>
            {children}
        </AuthUserContext>
    )

}

