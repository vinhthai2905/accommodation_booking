import { useContext } from "react"
import { HotelDetailsContext } from "../../context/HotelDetailsContext"

export default function useHotelDetails() {
    const { hotelQuery } = useContext(HotelDetailsContext)

    return {
        hotelQuery
    }
}