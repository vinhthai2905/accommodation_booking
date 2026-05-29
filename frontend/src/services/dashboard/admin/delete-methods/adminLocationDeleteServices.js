import axios from "axios"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const deleteAdminWard = async (id_ward) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/location/ward/${id_ward}`,
    { headers }
  )

  return data
}
