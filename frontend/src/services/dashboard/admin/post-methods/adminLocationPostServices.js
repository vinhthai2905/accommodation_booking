import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const createAdminWard = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.post(
    `${apiUrl}/api/location/ward`,
    payload,
    { headers }
  )

  return data
}

export const updateAdminWard = async (id_ward, payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/location/ward/${id_ward}`,
    payload,
    { headers }
  )

  return data
}
