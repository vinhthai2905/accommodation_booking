import { useQuery } from "@tanstack/react-query"
import { getAdminCities } from "../../../../../services/dashboard/admin/get-methods/adminLocationGetServices"

export function useAdminCities() {
    return useQuery({
        queryKey: ["adminCities"],
        queryFn: getAdminCities,
    })
}
