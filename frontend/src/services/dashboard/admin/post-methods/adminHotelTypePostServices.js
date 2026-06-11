import bookingAPI from "../../../base/bookingAPI"
import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

export const createAdminHotelType = async (payload) => {
  const headers = buildTokenHeader()
  const { data } = await bookingAPI.post(`/api/admin/hotel-types`, payload, { headers })
  return data
}

export const updateAdminHotelType = async (id, payload) => {
  const headers = buildTokenHeader()
  const { data } = await bookingAPI.put(`/api/admin/hotel-types/${id}`, payload, { headers })
  return data
}
