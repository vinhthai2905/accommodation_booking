import { useQuery } from "@tanstack/react-query"
import { fetchPartnerChildrenPolicy } from "../../../../../services/dashboard/partner/get-methods/partnerHotelGetServices"

export const usePartnerChildrenPolicy = () => {
  return useQuery({
    queryKey: ["partnerChildrenPolicy"],
    queryFn: fetchPartnerChildrenPolicy,
  })
}
