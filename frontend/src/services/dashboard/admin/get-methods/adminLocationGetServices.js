import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const getAdminWards = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/location/ward`,
    { headers }
  )

  return data
}

export const getAdminCities = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/location/cities`,
    { headers }
  )

  return data
}
