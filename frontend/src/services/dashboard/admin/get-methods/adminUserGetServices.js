import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const getAdminUsers = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/admin/users`,
    { headers }
  )

  return data
}

export const getAdminRoles = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/admin/roles`,
    { headers }
  )

  return data
}
