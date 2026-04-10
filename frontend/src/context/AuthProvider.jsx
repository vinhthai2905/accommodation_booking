import { useState } from "react";

import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    const authValue = {
        user,
        setUser,
        isAuthenticated: !!user,
    }

    return (
        <AuthContext value={authValue}>
            {children}
        </AuthContext>
    )

}