import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const deleteAdminAmenityCategory = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/partner/hotel/category-amenities/${id_amenity_category}`,
    { headers }
  )

  return data
}

export const deleteAdminAmenity = async (id_amenity_type) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/partner/hotel/available-amenities/${id_amenity_type}`,
    { headers }
  )

  return data
}