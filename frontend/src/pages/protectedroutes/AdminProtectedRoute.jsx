import { Outlet, Navigate } from "react-router"

import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

export default function AdminProtectedRoute() {
    // const { user, isFetchingUser, accessToken: hasSession } = useAuthUserContext()
    
    // if (hasSession && isFetchingUser)
    //     return <LoadingFullScreen />

    // if (user.role !== "Khách hàng")
    //     return <Navigate to="/partner/dashboard" replace />


    return <Outlet />
}