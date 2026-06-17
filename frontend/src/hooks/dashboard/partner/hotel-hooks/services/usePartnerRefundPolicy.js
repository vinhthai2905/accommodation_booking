import { useQuery } from "@tanstack/react-query"
import { fetchPartnerRefundPolicy } from "../../../../../services/dashboard/partner/get-methods/partnerHotelGetServices"

export const usePartnerRefundPolicy = () => {
  return useQuery({
    queryKey: ["partnerRefundPolicy"],
    queryFn: fetchPartnerRefundPolicy,
  })
}
