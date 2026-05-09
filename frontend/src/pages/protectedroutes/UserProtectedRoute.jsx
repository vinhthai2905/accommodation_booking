import { Outlet } from "react-router"

import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"

export default function UserProtectedRoute() {
    const { user, isAuthenticated } = useAuthUserContext()
    

    return <Outlet />
}