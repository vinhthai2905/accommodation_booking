import bookingAPI from "../base/bookingAPI"


export const fetchHotel = async (hotelID) => {
  const { data } = await bookingAPI.get(`/api/hotel/${hotelID}`)
  return data
}

export const fetchHotelImages = async (hotelID) => {
  const { data } = await bookingAPI.get(`/api/hotel/${hotelID}/images`)
  return data
}

export const fetchHotelAmenities = async (hotelID) => {
  const { data } = await bookingAPI.get(`/api/hotel/${hotelID}/amenities`)
  return data
}

export const fetchHotelRoomTypesAvailability = async (hotelID, check_in, check_out) => {
  const { data } = await bookingAPI.get(
    `/api/hotel/${hotelID}/room_types`,
    {
      params: {
        check_in: check_in,
        check_out: check_out
      },
    }
  )

  return data
}

export const fetchHotelChildPolicy = async (hotelID) => {
  const { data } = await bookingAPI.get(`/api/hotel/${hotelID}/child_policy`)

  return data
}

export const fetchHotelRefundPolicy = async (hotelID) => {
  const { data } = await bookingAPI.get(`/api/hotel/${hotelID}/refund_policy`)

  return data
}
