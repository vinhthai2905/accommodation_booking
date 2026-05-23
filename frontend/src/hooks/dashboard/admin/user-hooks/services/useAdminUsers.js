import { useQuery } from "@tanstack/react-query"
import { getAdminUsers } from "../../../../../services/dashboard/admin/get-methods/adminUserGetServices"

export function useAdminUsers() {
    return useQuery({
        queryKey: ["adminUsers"],
        queryFn: getAdminUsers,
    })
}
