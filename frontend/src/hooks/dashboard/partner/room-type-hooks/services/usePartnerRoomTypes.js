import { useQuery } from "@tanstack/react-query"

import { fetchPartnerRoomTypes } from "../../../../../services/dashboard/partner/partnerHotelServices"

export default function usePartnerRoomTypes() {
  return useQuery({
    queryKey: ["partnerRoomTypes"],
    queryFn: fetchPartnerRoomTypes,
  })
}
