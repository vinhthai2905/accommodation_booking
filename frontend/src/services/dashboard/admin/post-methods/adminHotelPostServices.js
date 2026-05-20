import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const createAdminAmenityCategory = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.post(
    `${apiUrl}/api/partner/hotel/category-amenities`,
    payload,
    { headers }
  )

  return data
}

export const updateAdminAmenityCategory = async (id_amenity_category, payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/partner/hotel/category-amenities/${id_amenity_category}`,
    payload,
    { headers }
  )

  return data
}
