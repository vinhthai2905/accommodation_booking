import { parsePythonData } from "../../helpers/common/parsePythonData"

import bookingAPI from "../base/bookingAPI"

export const registerUser = async (data) => {
    const { data: responseData } = await bookingAPI.post(`/api/users`, parsePythonData(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return responseData
}