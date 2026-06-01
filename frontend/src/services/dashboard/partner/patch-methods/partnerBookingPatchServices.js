import axios from "axios"
import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const updatePartnerBookingStatus = async ({ bookingId, status }) => {
    const headers = buildTokenHeader()

    const { data } = await axios.patch(`${apiUrl}/api/partner/hotel/bookings/${bookingId}/status`, { status }, { headers })

    return data
}
