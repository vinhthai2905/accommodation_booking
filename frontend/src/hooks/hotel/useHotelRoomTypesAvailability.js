import { useQuery } from "@tanstack/react-query"
import { fetchHotelRoomTypesAvailability } from "../../services/hotel/hotelServices"

export default function useHotelRoomTypesAvailability(hotelID, checkIn, checkOut) {
    return useQuery({
        queryKey: ["hotelRoomTypesAvailability", hotelID],
        queryFn: () => fetchHotelRoomTypesAvailability(hotelID, checkIn, checkOut),
        enabled: !!hotelID && !!checkIn && !!checkOut
    })
}
