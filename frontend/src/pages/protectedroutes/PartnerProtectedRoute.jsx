import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"

import { Outlet, Navigate } from "react-router"
import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"

import { usePartnerOnboarding } from "../../hooks/partner-onboarding/services/usePartnerOnboarding"

export default function PartnerProtectedRoute() {
    const { user, accessToken: hasSession, isFetchingUser, isAuthenticated } = useAuthUserContext()
    const { partnerRegistration, isLoadingPartnerRegistration, checkRegistrationStatus } = usePartnerOnboarding()

    const isPartner = isAuthenticated && user?.role === "Đối tác"
    const isFetchingPartnerRegistration = isFetchingUser && isLoadingPartnerRegistration
    
    if (hasSession && isFetchingPartnerRegistration)
        return <LoadingFullScreen />

    if (!isPartner)
        return <Navigate to="/auth/partner/sign-in" replace />

    if (partnerRegistration.status !== "Đã duyệt") 
        return <Navigate to="/partner/onboarding" replace />

    return <Outlet />
}