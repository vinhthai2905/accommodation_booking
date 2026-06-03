import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const createAdminUser = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.post(
    `/api/admin/users`,
    payload,
    { headers }
  )

  return data
}

export const updateAdminUser = async (id_user, payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/admin/users/${id_user}`,
    payload,
    { headers }
  )

  return data
}
