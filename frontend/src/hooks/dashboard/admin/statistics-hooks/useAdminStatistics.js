import { useQuery } from "@tanstack/react-query"
import { fetchAdminHotelTypeStats } from "../../../../services/dashboard/admin/get-methods/adminStatisticsGetServices"

export function useAdminHotelTypeStats() {
  return useQuery({
    queryKey: ["adminHotelTypeStats"],
    queryFn: fetchAdminHotelTypeStats,
  })
}
