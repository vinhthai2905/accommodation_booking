import { useQuery } from "@tanstack/react-query"

import { fetchPartnerBeds, fetchPartnerRoomTypeBedDetails } from "../../../../../services/dashboard/partner/roomTypeDetailServices"

export function usePartnerBeds({ successLoadedRoomTypeDetails }) {
  return useQuery({
    queryKey: ["partnerBeds"],
    queryFn: fetchPartnerBeds,
    staleTime: 5 * 60 * 1000,
    // enabled: !!successLoadedRoomTypeDetails
  })
}

export function usePartnerRoomTypeBedDetails(id_room_type) {
  return useQuery({
    queryKey: ["partnerRoomTypeBedDetails", id_room_type],
    queryFn: () => fetchPartnerRoomTypeBedDetails(id_room_type),
    enabled: !!id_room_type,
  })
}