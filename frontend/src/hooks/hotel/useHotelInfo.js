import { useQuery } from "@tanstack/react-query"
import { fetchHotel } from "../../services/hotel/hotelServices"

export default function useHotelInfo(hotelID) {
    return useQuery({
        queryKey: ["hotel", hotelID],
        queryFn: () => fetchHotel(hotelID),
        enabled: !!hotelID
    })
}
