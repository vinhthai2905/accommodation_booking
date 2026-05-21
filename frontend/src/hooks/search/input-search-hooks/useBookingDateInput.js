import { useState } from "react"
import startOfDay from "date-fns/startOfDay"
import { addDays } from "date-fns"

import useClickOutside from "../../common/useClickOutside"

export default function useBookingDateInput() {
    const today = startOfDay(new Date())
    const [isDateOpened, setIsDateOpened] = useState(false)
    const { ref: dateRef } = useClickOutside(setIsDateOpened)
    const [ranges, setRanges] = useState([
        {
            startDate: today,
            endDate: addDays(today, 1),
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