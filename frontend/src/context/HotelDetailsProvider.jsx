import { HotelDetailsContext } from "./HotelDetailsContext"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router"

import { fetchHotel, fetchHotelImages } from "../services/hotelAPI"

export default function HotelDetailsProvider({ children }) {
    const { uuid } = useParams()

    const {
        isLoading: isLoadingHotel,
        data: hotel,
        error: hotelError
    } = useQuery({
        queryKey: ["hotel", uuid],
        queryFn: () => fetchHotel(uuid),
        enabled: !!uuid
    })

    const {
        isLoadingRoomTypes,
        data:
        roomType, roomTypeError
    } = useQuery({
        queryKey: ["hotelRoomTypes", hotel?.hotel_id],
        queryFn: () => fetchHotelRoomTypes(uuid),
        enabled: !!hotel?.hotel_id
    })

    const hotelDetailValue = {
        hotelQuery: {
            isLoading: isLoadingHotel,
            error: hotelError,
            data: hotel,
        },
        roomTypes: {
            isLoading: isLoadingRoomTypes,
            error: roomTypeError,
            data: roomType
        }
    }

    return (
        <HotelDetailsContext value={hotelDetailValue}>
            {children}
        </HotelDetailsContext>
    )
}