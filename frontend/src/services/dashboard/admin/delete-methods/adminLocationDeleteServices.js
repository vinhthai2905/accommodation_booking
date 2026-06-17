import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const deleteAdminWard = async (id_ward) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/location/ward/${id_ward}`,
    { headers }
  )

  return data
}
