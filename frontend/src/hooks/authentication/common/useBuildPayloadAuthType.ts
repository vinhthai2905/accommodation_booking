import { useLocation } from "react-router"

import { Role } from "../../../types/authentication/domain/choices"

export default function useBuildPayloadAuthType(): Role {
    const location = useLocation()

    if (location.pathname.includes("partner")) {
        return Role.Partner
    } else if (location.pathname.includes("admin")) {
        return Role.Admin
    }

    return Role.Customer
}