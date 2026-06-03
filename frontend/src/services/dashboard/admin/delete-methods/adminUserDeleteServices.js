import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const deleteAdminUser = async (id_user) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/admin/users/${id_user}`,
    { headers }
  )

  return data
}
