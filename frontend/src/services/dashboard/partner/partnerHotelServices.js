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

export const fetchPartnerBeds = async () => {
  const headers = buildTokenHeader()
  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/beds`, { headers })
  return data
}

export const fetchPartnerRoomTypeBedDetails = async (id_room_type) => {
  const headers = buildTokenHeader()
  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel/room_type/${id_room_type}/bed_details`,
    { headers }
  )
  return data
}

export const createPartnerRoomTypeBedDetail = async ({ id_room_type, payload }) => {
  const headers = buildTokenHeader()
  const { data } = await axios.post(
    `${apiUrl}/api/partner/hotel/room_type/${id_room_type}/bed_details`,
    payload,
    { headers }
  )
  return data
}

export const deletePartnerRoomTypeBedDetail = async ({ id_room_type, id_room_type_detail }) => {
  const headers = buildTokenHeader()
  await axios.delete(
    `${apiUrl}/api/partner/hotel/room_type/${id_room_type}/bed_details/${id_room_type_detail}`,
    { headers }
  )
}
