import AuthLoadingScreen from "../../features/book/components/Shared/LoadingFullScreen"

import { Outlet } from "react-router"

import useAuthNavigation from "../../hooks/authentication/common/useAuthNavigation"
import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"

export default function AuthRedirectRoute() {
    const { user, isAuthenticated, isFetchingUser } = useAuthUserContext()
    const navigate = useAuthNavigation()

    if (isFetchingUser) {
        return <AuthLoadingScreen />
    }

    if (isAuthenticated) {
        if (user?.role === "Đối tác")
            navigate(user.role)

        return navigate(user.role)
    }

    return <Outlet />
}