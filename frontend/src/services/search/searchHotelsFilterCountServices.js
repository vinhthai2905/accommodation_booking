import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchHotelAmenitiesCount = async (searchHotelsParams) => {
    const { data } = await axios.get(`${apiUrl}/api/hotels/search/amenities/hotel_count`, {
        params: searchHotelsParams,
    })

    return data
}
