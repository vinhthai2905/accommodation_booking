import { Outlet, Navigate } from "react-router"

import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"
import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

export default function UserProtectedRoute() {
    const { user, isFetchingUser, accessToken } = useAuthUserContext()
    
    if (!!accessToken && isFetchingUser)
        return <LoadingFullScreen />

    // if (user.role !== "Khách hàng")
    //     return <Navigate to="/partner/dashboard" replace />


    return <Outlet />
}