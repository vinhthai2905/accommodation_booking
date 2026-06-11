import bookingAPI from "../../../base/bookingAPI"
import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

export const deleteAdminHotelType = async (id) => {
  const headers = buildTokenHeader()
  const { data } = await bookingAPI.delete(`/api/admin/hotel-types/${id}`, { headers })
  return data
}
