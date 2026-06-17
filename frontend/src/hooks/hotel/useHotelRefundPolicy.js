import { useQuery } from "@tanstack/react-query"
import { fetchHotelRefundPolicy } from "../../services/hotel/hotelServices"

export default function useHotelRefundPolicy(hotelID) {
    return useQuery({
        queryKey: ["hotelRefundPolicy", hotelID],
        queryFn: () => fetchHotelRefundPolicy(hotelID),
        enabled: !!hotelID
    })
}
