import axios from "axios"

import { buildTokenHeader } from "../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const getPartnerBookings = async (tab = "upcoming") => {
    const headers = buildTokenHeader()

    const { data } = await axios.get(
        `${apiUrl}/api/partner/hotel/bookings`,
        {
            headers,
            params: { tab },
        }
    )

    return data
}