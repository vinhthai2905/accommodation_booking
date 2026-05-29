import { useQuery } from "@tanstack/react-query"
import { getAdminRoles } from "../../../../../services/dashboard/admin/get-methods/adminUserGetServices"

export function useAdminRoles() {
    return useQuery({
        queryKey: ["adminRoles"],
        queryFn: getAdminRoles,
    })
}
