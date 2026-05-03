import { useSearchParams } from "react-router"
import { useContext } from "react"

import { BookingContext } from "../../context/BookingContext"

import { buildBookingPayLoad } from "../../helpers/buildBookingPayload"
import { getCheckoutParams } from "../../helpers/getCheckoutParams"

export default function useBookingPayload() {
    const [searchParams] = useSearchParams()
    const { selectedRoomIds } = useContext(BookingContext)

    const buildPayload = (submitData) => {
        return buildBookingPayLoad({
            ...submitData,
            ...getCheckoutParams(searchParams),
            selectedRoomIds,
        })
    }

    return buildPayload
} 