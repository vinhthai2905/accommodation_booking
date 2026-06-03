import { buildTokenHeader } from "../../../../helpers/authentication/buildTokenHeader"
import bookingAPI from "../../../base/bookingAPI"


export const fetchPartnerBeds = async () => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.get(`/api/partner/hotel/beds`, { headers })

    return data
}

export const fetchPartnerRoomTypeBedDetails = async (id_room_type) => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.get(
        `/api/partner/hotel/room_type/${id_room_type}/bed_details`,
        { headers }
    )
    return data
}

export const createPartnerRoomTypeBedDetail = async (id_room_type, payload) => {
    const headers = buildTokenHeader()
    const { data } = await bookingAPI.post(
        `/api/partner/hotel/room_type/${id_room_type}/bed_details`,
        payload,
        { headers }
    )

    return data
}

export const deletePartnerRoomTypeBedDetail = async ({ id_room_type, id_room_type_detail }) => {
    const headers = buildTokenHeader()
    
    await bookingAPI.delete(
        `/api/partner/hotel/room_type/${id_room_type}/bed_details/${id_room_type_detail}`,
        { headers }
    )
}