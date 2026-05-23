import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const deleteAdminUser = async (id_user) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/admin/users/${id_user}`,
    { headers }
  )

  return data
}
