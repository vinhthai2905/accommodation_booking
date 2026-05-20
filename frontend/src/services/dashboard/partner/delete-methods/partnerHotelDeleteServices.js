import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const deletePartnerHotelImage = async (id_hotel_image) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/partner/hotel/images/${id_hotel_image}`,
    { headers }
  )

  return data
}

export const deletePartnerHotelAmenity = async (id_hotel_amenity) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/partner/hotel/amenities/${id_hotel_amenity}`,
    { headers }
  )

  return data
}

export const deletePartnerHotelCategory = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/partner/hotel/category-amenities/${id_amenity_category}`,
    { headers }
  )

  return data
}