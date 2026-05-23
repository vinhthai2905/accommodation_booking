import { useEffect, useState } from "react"
import { Outlet, Navigate, useLocation } from "react-router"
import { useAuthUserContext } from "../../hooks/authentication/common/useAuthUserContext"
import LoadingFullScreen from "../../features/book/components/Shared/LoadingFullScreen"
import { fetchHotelRegistrationStatus } from "../../features/partner-onboarding/services/partnerOnboardingServices"

export default function PartnerProtectedRoute() {
    const { user, accessToken: hasSession, isFetchingUser, isAuthenticated } = useAuthUserContext()
    const [checkingStatus, setCheckingStatus] = useState(true)
    const [registrationStatus, setRegistrationStatus] = useState(null)
    const location = useLocation()

    useEffect(() => {
        if (isFetchingUser) return;

        if (!isAuthenticated || user?.role !== "Đối tác") {
            setCheckingStatus(false)
            return
        }

        const checkStatus = async () => {
            setCheckingStatus(true)
            try {
                const reg = await fetchHotelRegistrationStatus()
                setRegistrationStatus(reg?.status || null)
            } catch (err) {
                console.error("Failed to fetch registration status:", err)
            } finally {
                setCheckingStatus(false)
            }
        }
        checkStatus()
    }, [isAuthenticated, user, isFetchingUser])

    if (hasSession && (isFetchingUser || checkingStatus))
        return <LoadingFullScreen />

    if (!isAuthenticated || user.role !== "Đối tác")
        return <Navigate to="/auth/partner/sign-in" replace />

    const isOnboardingPage = location.pathname === "/partner/onboarding"

    if (registrationStatus !== "Đã duyệt") {
        if (!isOnboardingPage) {
            return <Navigate to="/partner/onboarding" replace />
        }
    } else {
        if (isOnboardingPage) {
            return <Navigate to="/partner/dashboard" replace />
        }
    }

    return <Outlet />
}