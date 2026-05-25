import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchHotelResult = async (searchHotelsParams) => {
    const { data } = await axios.get(`${apiUrl}/api/hotels/search`, {
        params: searchHotelsParams,
    })

    return data
}


export const fetchHotelResultMap = async (searchHotelsParamsMap) => {
    const { data } = await axios.get(`${apiUrl}/api/hotels/search/map`, {
        params: searchHotelsParamsMap,
    })

    return data
}

