import axios from "axios"

import { buildTokenHeader } from "../../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const createPartnerRoomType = async (payload) => {
    const headers = buildTokenHeader()

    const { data } = await axios.post(`${apiUrl}/api/partner/hotel/room_types`, payload, {
        headers,
    })

    return data
}

export const updatePartnerRoomType = async (id_room_type, payload) => {
    const headers = buildTokenHeader()

    const { data } = await axios.put(
        `${apiUrl}/api/partner/hotel/room_type/${id_room_type}`,
        payload,
        { headers }
    )

    return data
}

export const deletePartnerRoomType = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await axios.delete(
    `${apiUrl}/api/partner/hotel/room_type/${id_room_type}`,
    { headers }
  )

  return data
}