import { HotelDetailsContext } from "./HotelDetailsContext"
import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router"

import { fetchHotel, fetchHotelRoomTypes } from "../services/hotelServices"

export default function HotelDetailsProvider({ children }) {
    const { uuid } = useParams()
    const [ searchParams, setSearchParams ] = useSearchParams()

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
        isLoading: isLoadingRoomTypes,
        data: roomType,
        error: roomTypeError
    } = useQuery({
        queryKey: ["hotelRoomTypes", hotel?.id_hotel],
        queryFn: () => {
            return (
                fetchHotelRoomTypes(uuid, searchParams.get("check_in"), searchParams.get("check_out"))
            )
        },
        enabled: !!hotel?.id_hotel
    })

    const hotelDetailValue = {
        hotelQuery: {
            isLoading: isLoadingHotel,
            error: hotelError,
            data: hotel,
        },
        roomTypesQuery: {
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