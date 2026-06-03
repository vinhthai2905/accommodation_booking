import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"
import { selectContentType } from "../../helpers/partner-onboarding/selectContentType"
import bookingAPI from "../base/bookingAPI"

export const fetchHotelTypes = async () => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.get(`/api/partner/hotel-types`, { headers })
    return data
}

export const submitHotelRegistration = async (dataPayload) => {
    const headers = buildTokenHeader()
    const body = selectContentType(dataPayload, headers)

    const { data } = await bookingAPI.post(`/api/partner/hotel/register`, body, { headers })
    return data
}

export const fetchHotelRegistrationStatus = async () => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.get(`/api/partner/hotel/register`, { headers })
    return data
}
