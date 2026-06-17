import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"
import { selectContentType } from "../../helpers/partner-onboarding/selectContentType"
import bookingAPI from "../base/bookingAPI"

export const createUserReview = async (payload) => {
    const { id_booking, ...restPayload } = payload

    const headers = buildTokenHeader()
    const body = selectContentType(restPayload, headers)

    const { data } = await bookingAPI.post(`/api/user/review/${id_booking}`, body, { headers })
    return data
}

export const fetchHotelReviews = async (id_hotel) => {
    const { data } = await bookingAPI.get(`/api/hotel/${id_hotel}/reviews`)
    return data
}
