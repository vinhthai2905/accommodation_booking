import { BookingContext } from "./BookingContext"

import useRoomSelected from "../hooks/booking/useRoomSelected"

export default function BookingProvider({ children }) {
    const roomSelection = useRoomSelected()

    return (
        <BookingContext value={roomSelection}>
            {children}
        </BookingContext>
    )
}