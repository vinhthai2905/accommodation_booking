import { Outlet } from "react-router"

import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"

export default function PartnerProtectedRoute() {
    const { user, isAuthenticated } = useAuthUserContext()

    if (!isAuthenticated && !user.role)

    return <Outlet />
}