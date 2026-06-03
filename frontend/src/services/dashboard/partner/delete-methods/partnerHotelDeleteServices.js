import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const deletePartnerHotelImage = async (id_hotel_image) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/partner/hotel/images/${id_hotel_image}`,
    { headers }
  )

  return data
}

export const deletePartnerHotelAmenity = async (id_hotel_amenity) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/partner/hotel/amenities/${id_hotel_amenity}`,
    { headers }
  )

  return data
}

export const deleteAdminAmenityCategory = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/partner/hotel/category-amenities/${id_amenity_category}`,
    { headers }
  )

  return data
}