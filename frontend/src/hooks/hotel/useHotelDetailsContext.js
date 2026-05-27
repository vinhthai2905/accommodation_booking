import { useContext } from "react"
import { HotelDetailsContext } from "../../context/hotels/HotelDetailsContext"

export default function useHotelDetailsContext() {
    const { hotelQuery, roomTypesQuery, childPolicyQuery, hotelAmenitiesQuery } = useContext(HotelDetailsContext)

    const isFetchingHotelData = (
        hotelQuery.isLoading || roomTypesQuery.isLoading || childPolicyQuery.isLoading || hotelAmenitiesQuery.isLoading
    )

    return {
        hotelQuery,
        roomTypesQuery,
        childPolicyQuery,
        hotelAmenitiesQuery,
        isFetchingHotelData
    }
}