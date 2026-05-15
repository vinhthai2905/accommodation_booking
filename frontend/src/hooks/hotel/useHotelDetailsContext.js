import { useContext } from "react"
import { HotelDetailsContext } from "../../context/hotels/HotelDetailsContext"

export default function useHotelDetailsContext() {
    const { hotelQuery, roomTypesQuery, childPolicyQuery } = useContext(HotelDetailsContext)

    const isFetchingHotelData = (
        hotelQuery.isLoading || roomTypesQuery.isLoading || childPolicyQuery.isLoading
    )

    return {
        hotelQuery,
        roomTypesQuery,
        childPolicyQuery,
        isFetchingHotelData
    }
}