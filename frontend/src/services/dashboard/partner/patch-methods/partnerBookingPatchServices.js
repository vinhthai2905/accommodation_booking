import bookingAPI from "../../../base/bookingAPI"
import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const updatePartnerBookingStatus = async ({ bookingId, status }) => {
    const headers = buildTokenHeader()

    const { data } = await bookingAPI.patch(`/api/partner/hotel/bookings/${bookingId}/status`, { status }, { headers })

    return data
}
