import { useQuery } from "@tanstack/react-query"
import { getAdminWards } from "../../../../../services/dashboard/admin/get-methods/adminLocationGetServices"

export function useAdminWards() {
    return useQuery({
        queryKey: ["adminWards"],
        queryFn: getAdminWards,
    })
}
