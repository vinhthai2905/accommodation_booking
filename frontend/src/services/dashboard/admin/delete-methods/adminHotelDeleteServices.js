import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const deleteAdminAmenityCategory = async (id_amenity_category) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/partner/hotel/category-amenities/${id_amenity_category}`,
    { headers }
  )

  return data
}