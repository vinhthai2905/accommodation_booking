import { useLocation } from "react-router"

export default function useBuildPayloadAuthType() {
    const location = useLocation()

    if (location.pathname.includes("partner")) {
        return "Đối tác"
    } else if (location.pathname.includes("admin")) {
        return "Admin"
    }
    
    return "Khách hàng"
}