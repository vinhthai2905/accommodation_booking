import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchHotelResult = async (searchParamsData) => {
  const { data } = await axios.get(`${apiUrl}/api/hotels/search`, {
    params: searchParamsData,
  })
  
  return data
}

export const fetchHotel = async (hotelID) => {
  const { data } = await axios.get(`${apiUrl}/api/hotel/${hotelID}`)
  return data
}

export const fetchHotelImages = async (hotelID) => {
  const { data } = await axios.get(`${apiUrl}/api/hotel/${hotelID}/images`)
  return data
}