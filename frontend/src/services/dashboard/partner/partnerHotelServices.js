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

export const fetchPartnerRoomTypeDetail = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel/room_type/${id_room_type}`,
    { headers }
  )

  return data
}

export const fetchPartnerPhysicalRooms = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/partner/hotel/room_type/${id_room_type}/rooms`, {
    headers,
  })

  return data
}

export const fetchPartnerHotelDetail = async () => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/partner/hotel`,
    { headers }
  )

  return data
}

export const updatePartnerHotel = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await axios.put(
    `${apiUrl}/api/partner/hotel`,
    payload,
    { headers }
  )

  return data
}
