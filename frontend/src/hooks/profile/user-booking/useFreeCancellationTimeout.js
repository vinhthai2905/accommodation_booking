import { useState, useEffect } from "react"

import { getRemainingMinutes, checkIsExpiration } from "../../../features/profile/helpers/getRemainingMinutes"

export function useFreeCancellationTimeout(booking, refundPolicy) {
    const [freeCancellationTimeout, setFreeCancellationTimeout] = useState(0)
    const freeCancellationMilli = refundPolicy.free_cancellation_minutes * 60 * 1000
    const timeBookingMilli = new Date(booking.created_at).getTime()
    const freeCancellationExpiresAt = new Date(timeBookingMilli + freeCancellationMilli)

    useEffect(() => {
        const freeCancellation = setInterval(() => {
            const minutesLeft = getRemainingMinutes(freeCancellationExpiresAt)

            if (checkIsExpiration(freeCancellationExpiresAt)) {
                setFreeCancellationTimeout(0)
                clearInterval(freeCancellation)
            } else {
                setFreeCancellationTimeout(minutesLeft)
            }
        }, 1000)

        return () => clearInterval(freeCancellation)
    })

    return {
        freeCancellationTimeout,
        freeCancellationExpiresAt,
        setFreeCancellationTimeout
    }
}