import bookingAPI from "../base/bookingAPI"


export const fetchHotelAmenitiesCount = async (searchHotelsParams) => {
    const { data } = await bookingAPI.get(`/api/hotels/search/amenities/hotel_count`, {
        params: searchHotelsParams,
    })

    return data
}
