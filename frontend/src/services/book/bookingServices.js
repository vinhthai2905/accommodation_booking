import axios from "axios"
import { buildTokenHeader } from "../../helpers/authentication/buildTokenHeader"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchBookingSummary = async (hotelID) => {
  const { data } = await axios.get(`${apiUrl}/api/hotel/${hotelID}/booking_summary`)

  return data

  // Authenticated User services

}

export const fetchAuthUserBookings = async (activeTab) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(
    `${apiUrl}/api/user/bookings`,
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

  const { data } = await axios.post(`${apiUrl}/api/hotel/booking`, bookingData, { headers })

  return data
}

export const fetchBookingConfirmation = async (bookingID) => {
  const headers = buildTokenHeader()

  const { data } = await axios.get(`${apiUrl}/api/user/booking/${bookingID}/confirmation`, { headers })

  return data
}


export const cancelBooking = async (bookingID) => {
  const headers = buildTokenHeader()

  const { data } = await axios.patch(`${apiUrl}/api/user/booking/${bookingID}/cancel`, {}, { headers })

  return data
}
