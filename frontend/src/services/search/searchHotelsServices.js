import bookingAPI from "../base/bookingAPI"


export const fetchHotelResult = async (searchHotelsParams) => {
    const { data } = await bookingAPI.get(`/api/hotels/search`, {
        params: searchHotelsParams,
    })

    return data
}


export const fetchHotelResultMap = async (searchHotelsParamsMap) => {
    const { data } = await bookingAPI.get(`/api/hotels/search/map`, {
        params: searchHotelsParamsMap,
    })

    return data
}

