import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const getAdminUsers = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/admin/users`,
    { headers }
  )

  return data
}

export const getAdminRoles = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/admin/roles`,
    { headers }
  )

  return data
}
