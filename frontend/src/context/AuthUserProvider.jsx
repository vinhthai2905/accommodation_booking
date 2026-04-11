import { useState } from "react";

import { AuthUserContext } from "./AuthUserContext";

export default function AuthUserProvider({ children }) {
    const [user, setUser] = useState(null)

    const authValue = {
        user,
        setUser,
        isAuthenticated: !!user,
    }

    return (
        <AuthUserContext value={authValue}>
            {children}
        </AuthUserContext>
    )

}