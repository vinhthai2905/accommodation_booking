import { useState } from "react";

import { AuthUserContext } from "./AuthUserContext";

import useRefreshUser from "../hooks/authentication/useRefreshUser";
import useAuthActions from "../hooks/authentication/useAuthActions";

export default function AuthUserProvider({ children }) {
    const [user, setUserState] = useState(null)
    const { setAuthUserState, fetchAuthUserState, clearAuthUserState } = useAuthActions(setUserState)
    const { isLoading, error, data } = useRefreshUser(fetchAuthUserState)

    const authUserContext = {
        user,
        isFetchingUser: isLoading,
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