import { useQuery } from "@tanstack/react-query"
import { fetchHotelChildPolicy } from "../../services/hotel/hotelServices"

export default function useHotelChildPolicy(hotelID) {
    return useQuery({
        queryKey: ["hotelChildPolicy", hotelID],
        queryFn: () => fetchHotelChildPolicy(hotelID),
        enabled: !!hotelID
    })
}