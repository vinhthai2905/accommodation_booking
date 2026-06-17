import { parsePythonData } from "../../helpers/common/parsePythonData"

import bookingAPI from "../base/bookingAPI"

export const registerPartner = async (data) => {
    const { data: responseData } = await bookingAPI.post(`/api/partners`, parsePythonData(data), {
        headers: {
            "Content-Type": "application/json"
        }
    })
    return responseData
}