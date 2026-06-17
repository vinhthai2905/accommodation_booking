import { Outlet, Navigate } from "react-router"

import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"
import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

export default function UserProtectedRoute() {
    const { user, isFetchingUser, accessToken: hasSession, isAuthenticated } = useAuthUserContext()
    // const isAdmin = hasSession || user.role === "Admin"
    // const isPartner = hasSession || user.role === "Partner"

    const isPartnerSession = hasSession && isAuthenticated && user?.role === "Partner"
    const isAdminSession = hasSession && isAuthenticated && user?.role === "Admin"

    if (hasSession && isFetchingUser)
        return <LoadingFullScreen />

    if (isPartnerSession)
        return <Navigate to="/partner/dashboard" replace />

    if (isAdminSession)
        return <Navigate to="/admin/dashboard" replace />


    return <Outlet />
}