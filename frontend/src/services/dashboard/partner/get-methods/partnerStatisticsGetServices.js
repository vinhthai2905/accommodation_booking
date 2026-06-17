import bookingAPI from "../../../base/bookingAPI";
import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader";

export const fetchPartnerStatistics = async (time_filter) => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.get(
        `/api/partner/hotel/statistics`,
        { 
            headers,
            params: { time_filter }
        }
    )
    return data
}
