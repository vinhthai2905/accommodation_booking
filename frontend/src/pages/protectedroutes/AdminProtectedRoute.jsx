import { Outlet, Navigate } from "react-router"
import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"
import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"

export default function AdminProtectedRoute() {
    const { user, isFetchingUser, accessToken: hasSession } = useAuthUserContext()
    
    if (hasSession && isFetchingUser)
        return <LoadingFullScreen />

    if (!hasSession || user?.role !== "Admin")
        return <Navigate to="/auth/admin/sign-in" replace />

    return <Outlet />
}