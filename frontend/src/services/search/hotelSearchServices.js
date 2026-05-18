import axios from "axios"

const apiUrl = import.meta.env.VITE_API_URL

export const fetchHotelResult = async (searchParamsData) => {
    const { data } = await axios.get(`${apiUrl}/api/hotels/search`, {
        params: searchParamsData,
    })

    return data
}


export const fetchHotelResultMap = async (searchParamsData) => {
    const { data } = await axios.get(`${apiUrl}/api/hotels/search/map`, {
        params: searchParamsData,
    })

    return data
}

