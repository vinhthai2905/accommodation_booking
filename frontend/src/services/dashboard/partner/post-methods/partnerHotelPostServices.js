import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const updatePartnerHotel = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/partner/hotel`,
    payload,
    { headers }
  )

  return data
}

export const createPartnerHotelImage = async (payload) => {
  const headers = buildTokenHeader()
  
  if (payload instanceof FormData) {
    delete headers["Content-Type"]
  }

  const { data } = await axios.post(
    `${apiUrl}/api/partner/hotel/images`,
    payload,
    { headers }
  )

  return data
}

export const updatePartnerHotelImage = async (id_hotel_image, payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/partner/hotel/images/${id_hotel_image}`,
    payload,
    { headers }
  )

  return data
}

export const createPartnerHotelAmenity = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.post(
    `${apiUrl}/api/partner/hotel/amenities`,
    payload,
    { headers }
  )

  return data
}

export const createPartnerHotelCategory = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.post(
    `${apiUrl}/api/partner/hotel/category-amenities`,
    payload,
    { headers }
  )

  return data
}

export const updatePartnerHotelCategory = async (id_amenity_category, payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/partner/hotel/category-amenities/${id_amenity_category}`,
    payload,
    { headers }
  )

  return data
}

