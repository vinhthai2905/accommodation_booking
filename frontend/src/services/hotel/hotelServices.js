import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL


export const fetchHotel = async (hotelID) => {
  const { data } = await axios.get(`${apiUrl}/api/hotel/${hotelID}`)
  return data
}

export const fetchHotelRoomTypesAvailability = async (hotelID, check_in, check_out) => {
  const { data } = await axios.get(
    `${apiUrl}/api/hotel/${hotelID}/room_types`,
    {
      params: {
        check_in: check_in,
        check_out: check_out
      },
    }
  )

  return data
}

export const fetchHotelImages = async (hotelID) => {
  const { data } = await axios.get(`${apiUrl}/api/hotel/${hotelID}/images`)
  return data
}

export const fetchHotelChildPolicy = async (hotelID) => {
  const { data } = await axios.get(`${apiUrl}/api/hotel/${hotelID}/child_policy`)

  return data
}

