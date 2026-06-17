/*  */import { HotelDetailsContext } from "./HotelDetailsContext"
import { useParams, useSearchParams } from "react-router"

import useHotelInfo from "../../hooks/hotel/useHotelInfo"
import useHotelRoomTypesAvailability from "../../hooks/hotel/useHotelRoomTypesAvailability"
import useHotelChildPolicy from "../../hooks/hotel/useHotelChildPolicy"
import useHotelAmenities from "../../hooks/hotel/useHotelAmenities"
import useHotelRefundPolicy from "../../hooks/hotel/useHotelRefundPolicy"

export default function HotelDetailsProvider({ children }) {
    const { uuid: hotelID } = useParams()
    const [searchParams] = useSearchParams()

    const {
        isPending: isLoadingHotel,
        data: hotel,
        error: hotelError
    } = useHotelInfo(hotelID)

    const {
        isPending: isLoadingRoomTypes,
        data: roomType,
        error: roomTypeError
    } = useHotelRoomTypesAvailability(
        hotel?.id_hotel,
        searchParams.get("check_in"),
        searchParams.get("check_out")
    )

    const {
        isPending: isLoadingChildPolicy,
        data: childPolicy,
        error: childPolicyError
    } = useHotelChildPolicy(hotel?.id_hotel)

    const {
        isPending: isLoadingAmenities,
        data: amenities,
        error: amenitiesError
    } = useHotelAmenities(hotel?.id_hotel)

    const {
        isPending: isLoadingRefundPolicy,
        data: refundPolicy,
        error: refundPolicyError
    } = useHotelRefundPolicy(hotel?.id_hotel)

    const hotelDetailValue = {
        hotelQuery: {
            isPending: isLoadingHotel,
            error: hotelError,
            data: hotel,
        },

        roomTypesQuery: {
            isPending: isLoadingRoomTypes,
            error: roomTypeError,
            data: roomType
        },

        childPolicyQuery: {
            isPending: isLoadingChildPolicy,
            childPolicyError,
            childPolicy
        },

        hotelAmenitiesQuery: {
            isPending: isLoadingAmenities,
            error: amenitiesError,
            data: amenities
        },

        refundPolicyQuery: {
            isPending: isLoadingRefundPolicy,
            error: refundPolicyError,
            data: refundPolicy
        }
    }

    return (
        <HotelDetailsContext value={hotelDetailValue}>
            {children}
        </HotelDetailsContext>
    )
}