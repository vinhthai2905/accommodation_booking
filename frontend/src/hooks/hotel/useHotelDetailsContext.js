import { useContext } from "react"
import { HotelDetailsContext } from "../../context/hotels/HotelDetailsContext"

export default function useHotelDetailsContext() {
    const { hotelQuery, roomTypesQuery } = useContext(HotelDetailsContext)

    return {
        hotelQuery,
        roomTypesQuery
    }
}