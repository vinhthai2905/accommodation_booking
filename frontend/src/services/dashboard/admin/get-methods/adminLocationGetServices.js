import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const getAdminWards = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/location/ward`,
    { headers }
  )

  return data
}

export const getAdminCities = async () => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/location/cities`,
    { headers }
  )

  return data
}
