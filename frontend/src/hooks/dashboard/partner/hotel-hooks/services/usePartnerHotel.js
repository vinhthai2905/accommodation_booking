import { useQuery } from "@tanstack/react-query"

import { fetchPartnerHotelDetail } from "../../../../../services/dashboard/partner/partnerHotelServices"

export default function usePartnerHotel() {
  return useQuery({
    queryKey: ["partnerHotel"],
    queryFn: fetchPartnerHotelDetail,
  })
}
