import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"
import bookingAPI from "../base/bookingAPI"

export const sendVerificationEmail = async () => {
    const { data } = await bookingAPI.post(`/api/auth/user/send/email-verification`, {}, {
        headers: buildTokenHeader(),
    })
    return data
}
