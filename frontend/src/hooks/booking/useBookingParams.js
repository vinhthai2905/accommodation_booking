import { useSearchParams } from "react-router"

import { getBookingParams } from "../../helpers/booking/getBookingParams"

export default function useBookingParams() {
    const [searchParams] = useSearchParams()
    const finalizeParams = getBookingParams(searchParams)
    const hasAllBookingParams = Object.values(finalizeParams).every(value => Boolean(value))

    return hasAllBookingParams
}