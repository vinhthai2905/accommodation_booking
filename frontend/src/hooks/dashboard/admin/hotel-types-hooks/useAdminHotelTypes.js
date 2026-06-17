import { useQuery } from "@tanstack/react-query"
import { fetchAdminHotelTypes } from "../../../../services/dashboard/admin/get-methods/adminHotelTypeGetServices"

export const useAdminHotelTypes = () => {
  return useQuery({
    queryKey: ["adminHotelTypes"],
    queryFn: fetchAdminHotelTypes,
  })
}
