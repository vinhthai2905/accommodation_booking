import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const createAdminUser = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.post(
    `${apiUrl}/api/admin/users`,
    payload,
    { headers }
  )

  return data
}

export const updateAdminUser = async (id_user, payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/admin/users/${id_user}`,
    payload,
    { headers }
  )

  return data
}
