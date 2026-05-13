import axios from "axios"

import { buildTokenHeader } from "../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchPartnerRoomTypes = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/room_types`, {
    headers,
  })

  return data
}

export const fetchPartnerPhysicalRooms = async (room_type_id) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/room_type/${room_type_id}/rooms`, {
    headers,
  })

  return data
}


