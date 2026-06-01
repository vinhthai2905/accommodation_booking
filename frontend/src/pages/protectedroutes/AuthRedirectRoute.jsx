import AuthLoadingScreen from "../../features/book/components/Shared/LoadingFullScreen"

import { Outlet, Navigate } from "react-router"

import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"

export default function AuthRedirectRoute() {
    const { user, isAuthenticated, isFetchingUser, accessToken } = useAuthUserContext()

    if (!!accessToken && isFetchingUser) {
        return <AuthLoadingScreen />
    }

    if (isAuthenticated) {
        if (user?.role === "Đối tác")
            return <Navigate to="/partner/dashboard" replace />
            
        if (user?.role === "Admin")
            return <Navigate to="/admin/dashboard" replace />

        return <Navigate to="/index" replace />
    }

    return <Outlet />
}