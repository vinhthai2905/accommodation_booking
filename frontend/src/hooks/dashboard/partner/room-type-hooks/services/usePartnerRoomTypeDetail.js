import { useQuery } from "@tanstack/react-query"
import { fetchPartnerRoomTypeDetail } from "../../../../../services/dashboard/partner/get-methods/partnerHotelGetServices"

export default function usePartnerRoomTypeDetail(id_room_type) {
    return useQuery({
        queryKey: ["partnerRoomType", id_room_type],
        queryFn: () => fetchPartnerRoomTypeDetail(id_room_type),
        enabled: !!id_room_type,
    })
}
