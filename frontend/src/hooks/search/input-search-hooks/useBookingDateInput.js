import { useState } from "react"
import startOfDay from "date-fns/startOfDay"
import { addDays } from "date-fns"

import useClickOutside from "../../common/useClickOutside"

export default function useBookingDateInput() {
    const today = startOfDay(new Date())
    const tomorrow = addDays(today, 1)
    const [isDateOpened, setIsDateOpened] = useState(false)
    const { ref: dateRef } = useClickOutside(setIsDateOpened)
    const [ranges, setRanges] = useState([
        {
            startDate: tomorrow,
            endDate: addDays(tomorrow, 1),
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