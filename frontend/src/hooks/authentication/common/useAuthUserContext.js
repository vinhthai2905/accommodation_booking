import { useContext } from "react"

import { AuthUserContext } from "../../../context/authentication/AuthUserContext"

export const useAuthUserContext = () => {
    const {
        user,
        isFetchingUser,
        setAuthUserState,
        clearAuthUserState,
        isAuthenticated,
        isVerified,
        accessToken
    } = useContext(AuthUserContext)

    return {
        user,
        isFetchingUser,
        setAuthUserState,
        clearAuthUserState,
        isAuthenticated,
        isVerified,
        accessToken
    }
}