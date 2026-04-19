import { useState } from "react";

import { AuthUserContext } from "./AuthUserContext";

import useRefreshUser from "../hooks/authentication/useRefreshUser";
import useAuthActions from "../hooks/authentication/useAuthActions";

export default function AuthUserProvider({ children }) {
    const [user, setUserState] = useState(null)
    const { fetchUserState, clearAuthState, setAccessToken, setCurrentUser } = useAuthActions(setUserState)
    const { isPending, error, data } = useRefreshUser(fetchUserState)

    const authUserContext = {
        user,
        fetchUserState,
        clearAuthState,
        setAccessToken,
        setCurrentUser,
        isAuthenticated: !!user,
    }

    return (
        <AuthUserContext value={authUserContext}>
            {children}
        </AuthUserContext>
    )

}