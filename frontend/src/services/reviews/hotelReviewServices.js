import bookingAPI from "../base/bookingAPI"

export const fetchHotelReviews = async (id_hotel) => {
    const { data } = await bookingAPI.get(`/api/hotel/${id_hotel}/reviews`)
    return data
}
