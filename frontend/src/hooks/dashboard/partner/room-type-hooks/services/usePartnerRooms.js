import { useQuery } from "@tanstack/react-query"

import { fetchPartnerPhysicalRooms } from "../../../../../services/dashboard/partner/partnerHotelServices"

export default function usePartnerRooms(id_room_type) {
  return useQuery({
    queryKey: ["partnerPhysicalRooms", id_room_type],
    queryFn: () => fetchPartnerPhysicalRooms(id_room_type),
    enabled: !!id_room_type,
  })
}
