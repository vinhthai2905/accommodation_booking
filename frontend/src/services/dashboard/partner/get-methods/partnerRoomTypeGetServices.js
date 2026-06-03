import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const createPartnerRoomType = async (payload) => {
    const headers = buildTokenHeader()

    const { data } = await bookingAPI.post(`/api/partner/hotel/room_types`, payload, {
        headers,
    })

    return data
}

export const updatePartnerRoomType = async (id_room_type, payload) => {
    const headers = buildTokenHeader()

    const { data } = await bookingAPI.put(
        `/api/partner/hotel/room_type/${id_room_type}`,
        payload,
        { headers }
    )

    return data
}

export const deletePartnerRoomType = async (id_room_type) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/partner/hotel/room_type/${id_room_type}`,
    { headers }
  )

  return data
}

export const createPartnerPhysicalRoom = async (id_room_type, payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.post(
    `/api/partner/hotel/room_type/${id_room_type}/rooms`,
    payload,
    { headers }
  )

  return data
}

export const updatePartnerPhysicalRoom = async (id_room, payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/partner/hotel/rooms/${id_room}`,
    payload,
    { headers }
  )

  return data
}

export const deletePartnerPhysicalRoom = async (id_room) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.delete(
    `/api/partner/hotel/rooms/${id_room}`,
    { headers }
  )

  return data
}