import { useQuery } from "@tanstack/react-query"

import { fetchPartnerPhysicalRooms } from "../../../services/dashboard/partner/partnerHotelServices"

export default function usePartnerRooms(room_type_id) {
  return useQuery({
    queryKey: ["partnerPhysicalRooms", room_type_id],
    queryFn: () => fetchPartnerPhysicalRooms(room_type_id),
    enabled: !!room_type_id,
  })
}
