import { useState } from "react"
import startOfDay from "date-fns/startOfDay"

import useClickOutside from "../useClickOutside"

export default function useBookingDateInput() {
    const [isDateOpened, setIsDateOpened] = useState(false)
    const { ref: dateRef } = useClickOutside(setIsDateOpened)
    const [ranges, setRanges] = useState([
        {
            startDate: startOfDay(new Date()),
            endDate: startOfDay(new Date()),
            key: "bookingDate",
        },
    ])

    return {
        isDateOpened,
        setIsDateOpened,
        ranges,
        setRanges,
        dateRef
    }
}