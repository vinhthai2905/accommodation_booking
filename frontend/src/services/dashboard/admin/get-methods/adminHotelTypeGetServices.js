import bookingAPI from "../../../base/bookingAPI"
import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

export const fetchAdminHotelTypes = async () => {
  const headers = buildTokenHeader()
  const { data } = await bookingAPI.get(`/api/admin/hotel-types`, { headers })
  return data
}
