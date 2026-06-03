import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const fetchAdminHotelAmenityCategories = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(`/api/partner/hotel/category-amenities`, {
    headers,
  })

  return data
}