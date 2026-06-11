import bookingAPI from "../../../base/bookingAPI"
import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

export const fetchAdminHotelTypeStats = async () => {
  const headers = buildTokenHeader()
  const { data } = await bookingAPI.get(`/api/admin/statistics/hotel-types`, { headers })
  return data
}
