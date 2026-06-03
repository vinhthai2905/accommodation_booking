import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const fetchPartnerHotelDetail = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/partner/hotel`,
    { headers }
  )

  return data
}

export const fetchPartnerRoomTypes = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(`/api/partner/hotel/room_types`, {
    headers,
  })

  return data
}

export const fetchPartnerRoomTypeDetail = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/partner/hotel/room_type/${id_room_type}`,
    { headers }
  )

  return data
}

export const fetchPartnerPhysicalRooms = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(`/api/partner/hotel/room_type/${id_room_type}/rooms`, {
    headers,
  })

  return data
}

export const fetchPartnerHotelAmenities = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(`/api/partner/hotel/amenities`, {
    headers,
  })

  return data
}

export const fetchPartnerHotelAmenitiesByCategory = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/partner/hotel/category-amenities/${id_amenity_category}/amenities`,
    { headers }
  )

  return data
}

export const fetchAvailableAmenities = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(`/api/partner/hotel/available-amenities`, {
    headers,
  })

  return data
}

export const fetchPartnerHotelCategoryDetail = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/partner/hotel/category-amenities/${id_amenity_category}`,
    { headers }
  )

  return data
}

export const fetchPartnerChildrenPolicy = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/partner/hotel/policy/children`,
    { headers }
  )

  return data
}

export const updatePartnerChildrenPolicy = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/partner/hotel/policy/children`,
    payload,
    { headers }
  )

  return data
}

export const fetchPartnerRefundPolicy = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel/policy/refund`,
    { headers }
  )

  return data
}

export const updatePartnerRefundPolicy = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/partner/hotel/policy/refund`,
    payload,
    { headers }
  )

  return data
}
