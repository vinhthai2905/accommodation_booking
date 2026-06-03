import { useState, useEffect } from "react"

import { getRemainingMinutes, checkExpiration } from "../../../features/profile/helpers/getRemainingMinutes"

export function useFreeCancellationTimeout(booking, refundPolicy) {
    const [freeCancellationTimeout, setFreeCancellationTimeout] = useState(0)

    useEffect(() => {
        if (!refundPolicy || refundPolicy.free_cancellation_minutes == null) {
            return
        }

        const freeCancellationMilli = refundPolicy.free_cancellation_minutes * 60 * 1000
        const timeBookingMilli = new Date(booking.created_at).getTime()
        const freeCancellationExpiresAt = new Date(timeBookingMilli + freeCancellationMilli)

        // Initial check immediately
        const initialMinutesLeft = getRemainingMinutes(freeCancellationExpiresAt)
        if (checkExpiration(freeCancellationExpiresAt)) {
            setFreeCancellationTimeout(0)
            return
        } else {
            setFreeCancellationTimeout(initialMinutesLeft)
        }

        const freeCancellation = setInterval(() => {
            const minutesLeft = getRemainingMinutes(freeCancellationExpiresAt)

            if (checkExpiration(freeCancellationExpiresAt)) {
                setFreeCancellationTimeout(0)
                clearInterval(freeCancellation)
            } else {
                setFreeCancellationTimeout(minutesLeft)
            }
        }, 1000)

        return () => clearInterval(freeCancellation)
    }, [booking, refundPolicy])

    return {
        freeCancellationTimeout
    }
}