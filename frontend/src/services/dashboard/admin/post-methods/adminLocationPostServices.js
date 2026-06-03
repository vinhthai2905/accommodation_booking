import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const createAdminWard = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.post(
    `/api/location/ward`,
    payload,
    { headers }
  )

  return data
}

export const updateAdminWard = async (id_ward, payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/location/ward/${id_ward}`,
    payload,
    { headers }
  )

  return data
}
