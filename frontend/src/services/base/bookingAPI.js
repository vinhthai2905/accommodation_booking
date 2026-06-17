import axios from "axios"

const bookingAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL 
})

bookingAPI.interceptors.request.use((config) => {
    console.log(
        `[REQUEST] ${config.method?.toUpperCase()} ${config.url}`,
        {
            params: config.params,
            payload: config.data,
        }
    )

    return config
})

bookingAPI.interceptors.response.use(
    (response) => {
        console.log(
            `[RESPONSE] ${response.status} ${response.config.url}`,
            response.data
        )

        return response
    },
    (error) => {
        console.error(
            `[ERROR] ${error.response?.status} ${error.config?.url}`,
            {
                payload: error.config?.data,
                response: error.response?.data,
            }
        )

        return Promise.reject(error)
    }
)

export default bookingAPI
