import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const fetchPartnerBookings = async (tab = "upcoming") => {
    const headers = buildTokenHeader()

    const { data } = await bookingAPI.get(
        `/api/partner/hotel/bookings`,
        {
            headers,
            params: { tab },
        }
    )

    return data
}

export const fetchPartnerBookingDetail = async (bookingId) => {
    const headers = buildTokenHeader()

    const { data } = await bookingAPI.get(
        `/api/partner/hotel/bookings/${bookingId}`,
        {
            headers,
        }
    )

    return data
}