import { useNavigate } from "react-router"

export default function useAuthNavigation() {
    const navigate = useNavigate()

    const navigateAfterAuth = (userRole) => {
        const navigateTo =
            userRole === "Admin"
                ? "/admin/dashboard"
                : userRole === "Đối tác"
                    ? "/partner/dashboard"
                    : "/index"

        navigate(navigateTo, { replace: true })
    }

    return navigateAfterAuth
}