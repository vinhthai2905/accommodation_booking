import { useEffect } from "react"

import bookingAPI from "../../../services/base/bookingAPI"

export function usePropertyBeachDistanceAnalyzation(latitude, longitude, setValue) {
    useEffect(() => {
        if (!latitude || !longitude) return

        const timeoutId = setTimeout(async () => {
            try {
                const { data } = await bookingAPI.get(`/api/location/distance-to-beach?lat=${latitude}&lng=${longitude}`)
                if (data && data.distance_meters !== undefined) {
                    setValue("distance_to_beach", data.distance_meters, { shouldValidate: true })
                    setValue("is_near_beach", data.is_near_beach, { shouldValidate: true })
                }
            } catch (error) {
                console.error("Failed to fetch distance to beach", error)
            }
        }, 1000) // 1s debounce to prevent spamming

        return () => clearTimeout(timeoutId)
    }, [latitude, longitude, setValue])

    return null
}