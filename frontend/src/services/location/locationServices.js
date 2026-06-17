import bookingAPI from "../base/bookingAPI"

export const fetchWards = async () => {
    const { data } = await bookingAPI.get(`/api/location/ward`, {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return data
}