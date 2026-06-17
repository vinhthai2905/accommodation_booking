import bookingAPI from "../base/bookingAPI"
import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"


export const fetchBookingSummary = async (hotelID) => {
  const { data } = await bookingAPI.get(`/api/hotel/${hotelID}/booking_summary`)

  return data

  // Authenticated User services

}

export const fetchAuthUserBookings = async (activeTab) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(
    `/api/user/bookings`,
    {
      headers,
      params: {
        tab: activeTab
      }
    }
  )

  return data
}

export const createBooking = async (bookingData) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.post(`/api/hotel/booking`, bookingData, { headers })

  return data
}

export const fetchBookingConfirmation = async (bookingID) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.get(`/api/user/booking/${bookingID}/confirmation`, { headers })

  return data
}


export const cancelBooking = async (bookingID) => {
  const headers = buildTokenHeader()

  const { data } = await bookingAPI.patch(`/api/user/booking/${bookingID}/cancel`, {}, { headers })

  return data
}
