import { useRef, useState } from "react"
import startOfDay from "date-fns/startOfDay"


export default function useBookingCalendar() {
    const [focusedRange, setFocusedRange] = useState([0, 0])
    const keepFocusedCheckout = useRef(false)

    const today = startOfDay(new Date())
    const isSelectingCheckout = focusedRange[1] === 1

    return {
        today,
        keepFocusedCheckout,
        isSelectingCheckout,
        setFocusedRange
    }
}