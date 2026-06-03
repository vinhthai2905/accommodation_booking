import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const createAdminAmenityCategory = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.post(
    `/api/partner/hotel/category-amenities`,
    payload,
    { headers }
  )

  return data
}

export const updateAdminAmenityCategory = async (id_amenity_category, payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/partner/hotel/category-amenities/${id_amenity_category}`,
    payload,
    { headers }
  )

  return data
}

export const createAdminAmenity = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.post(
    `/api/partner/hotel/available-amenities`,
    payload,
    { headers }
  )

  return data
}

export const updateAdminAmenity = async (id_amenity_type, payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/partner/hotel/available-amenities/${id_amenity_type}`,
    payload,
    { headers }
  )

  return data
}
