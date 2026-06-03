import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"
import bookingAPI from "../base/bookingAPI"

export const fetchUserProfile = async () => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.get(`/api/public/users/me`, {
        headers,
    })
    return data
}

export const updateUserProfile = async (dataPayload) => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.patch(`/api/public/users/me`, dataPayload, {
        headers,
    })
    return data
}
