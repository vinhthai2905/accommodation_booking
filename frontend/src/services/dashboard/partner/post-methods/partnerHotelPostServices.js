import bookingAPI from "../../../base/bookingAPI"

import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"


export const updatePartnerHotel = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/partner/hotel`,
    payload,
    { headers }
  )

  return data
}

export const createPartnerHotelImage = async (payload) => {
  const headers = buildTokenHeader()
  
  if (payload instanceof FormData) {
    delete headers["Content-Type"]
  }

  const { data } = await bookingAPI.post(
    `/api/partner/hotel/images`,
    payload,
    { headers }
  )

  return data
}

export const updatePartnerHotelImage = async (id_hotel_image, payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.put(
    `/api/partner/hotel/images/${id_hotel_image}`,
    payload,
    { headers }
  )

  return data
}

export const createPartnerHotelAmenity = async (payload) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.post(
    `/api/partner/hotel/amenities`,
    payload,
    { headers }
  )

  return data
}


