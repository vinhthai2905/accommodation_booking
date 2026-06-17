import { useQuery } from "@tanstack/react-query"
import { fetchHotelAmenities } from "../../services/hotel/hotelServices"

export default function useHotelAmenities(hotelID) {
    return useQuery({
        queryKey: ["hotelAmenities", hotelID],
        queryFn: () => fetchHotelAmenities(hotelID),
        enabled: !!hotelID
    })
}
