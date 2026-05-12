import { Outlet, Navigate } from "react-router"

import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"
import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

export default function PartnerProtectedRoute() {
    const { user, accessToken: hasSession, isFetchingUser, isAuthenticated } = useAuthUserContext()
    
    if (hasSession && isFetchingUser)
        return <LoadingFullScreen />

    if (!isAuthenticated || user.role !== "Đối tác")
        return <Navigate to="/index" replace />


    return <Outlet />
}