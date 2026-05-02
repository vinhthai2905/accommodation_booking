import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchBookingSummary = async (hotelID) => {
  const { data } = await axios.get(`${apiUrl}/api/hotel/${hotelID}/booking_summary`)
  
  return data
}
