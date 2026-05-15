import { HotelDetailsContext } from "./HotelDetailsContext"
import { useQuery } from "@tanstack/react-query"
import { useParams, useSearchParams } from "react-router"

import { fetchHotel, fetchHotelRoomTypesAvailability, fetchHotelChildPolicy } from "../../services/hotel/hotelServices"

export default function HotelDetailsProvider({ children }) {
    const { uuid: hotelID } = useParams()

    const [searchParams] = useSearchParams()

    const {
        isLoading: isLoadingHotel,
        data: hotel,
        error: hotelError
    } = useQuery({
        queryKey: ["hotel", hotelID],
        queryFn: () => fetchHotel(hotelID),
        enabled: !!hotelID
    })

    const {
        isLoading: isLoadingRoomTypes,
        data: roomType,
        error: roomTypeError
    } = useQuery({
        queryKey: ["hotelRoomTypesAvailability", hotel?.id_hotel],
        queryFn: () => {
            return (
                fetchHotelRoomTypesAvailability(hotelID, searchParams.get("check_in"), searchParams.get("check_out"))
            )
        },
        enabled: !!hotel?.id_hotel
    })

    const {
        isLoading: isLoadingChildPolicy,
        data: childPolicy,
        error: childPolicyError
    } = useQuery({
        queryKey: ["hotelChildPolicy", hotel?.id_hotel],
        queryFn: () => fetchHotelChildPolicy(hotel.id_hotel),
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
        },

        childPolicyQuery: {
            isLoading: isLoadingChildPolicy,
            error: childPolicyError,
            data: childPolicy
        }
    }

    return (
        <HotelDetailsContext value={hotelDetailValue}>
            {children}
        </HotelDetailsContext>
    )
}