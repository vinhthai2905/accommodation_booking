import { useLocation } from "react-router"

export default function useBuildPayloadAuthType() {
    const location = useLocation()

    const isPartnerAuth = location.pathname.includes("partner")

    return isPartnerAuth ? "Đối tác" : "Khách hàng"
}