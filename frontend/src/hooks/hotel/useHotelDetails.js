import { useContext } from "react"
import { HotelDetailsContext } from "../../context/HotelDetailsContext"

export default function useHotelDetails() {
    const { hotelQuery, roomTypesQuery } = useContext(HotelDetailsContext)

    return {
        hotelQuery,
        roomTypesQuery
    }
}