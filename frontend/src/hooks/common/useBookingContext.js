import { useContext } from "react"
import { BookingContext } from "../../context/booking/BookingContext"

export default function useBookingContext() {
    const bookingContext = useContext(BookingContext)

    return bookingContext
}