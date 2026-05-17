import axios from "axios"

import { buildTokenHeader } from "../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchPartnerRoomTypes = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/room_types`, {
    headers,
  })

  return data
}

export const fetchPartnerRoomTypeDetail = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel/room_type/${id_room_type}`,
    { headers }
  )

  return data
}

export const fetchPartnerPhysicalRooms = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/room_type/${id_room_type}/rooms`, {
    headers,
  })

  return data
}

export const fetchPartnerHotelDetail = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel`,
    { headers }
  )

  return data
}

export const updatePartnerHotel = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/partner/hotel`,
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

export const deletePartnerHotelImage = async (id_hotel_image) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/partner/hotel/images/${id_hotel_image}`,
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

export const fetchPartnerHotelAmenities = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/amenities`, {
    headers,
  })

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

export const fetchPartnerHotelAmenityCategories = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/category-amenities`, {
    headers,
  })

  return data
}

export const fetchPartnerHotelAmenitiesByCategory = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel/category-amenities/${id_amenity_category}/amenities`,
    { headers }
  )

  return data
}

export const fetchAvailableAmenityTypes = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/available-amenities`, {
    headers,
  })

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

export const deletePartnerHotelCategory = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/partner/hotel/category-amenities/${id_amenity_category}`,
    { headers }
  )

  return data
}

export const fetchPartnerHotelCategoryDetail = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel/category-amenities/${id_amenity_category}`,
    { headers }
  )

  return data
}

