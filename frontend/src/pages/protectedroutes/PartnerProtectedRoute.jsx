import { Outlet, Navigate } from "react-router"

import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"
import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

export default function PartnerProtectedRoute() {
    const { user, isFetchingUser, isAuthenticated } = useAuthUserContext()
    
    if (isFetchingUser)
        return <LoadingFullScreen />

    if (!isAuthenticated || user.role !== "Đối tác")
        return <Navigate to="/index" replace />


    return <Outlet />
}