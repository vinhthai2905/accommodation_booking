import { useContext } from "react"
import { HotelDetailsContext } from "../../context/hotels/HotelDetailsContext"

export default function useHotelDetailsContext() {
    const { hotelQuery, roomTypesQuery, childPolicyQuery, hotelAmenitiesQuery, refundPolicyQuery } = useContext(HotelDetailsContext)

    const isFetchingHotelData = (
        hotelQuery.isPending || roomTypesQuery.isPending || childPolicyQuery.isPending || hotelAmenitiesQuery.isPending || refundPolicyQuery.isPending
    )

    return {
        hotelQuery,
        roomTypesQuery,
        childPolicyQuery,
        hotelAmenitiesQuery,
        refundPolicyQuery,
        isFetchingHotelData
    }
}