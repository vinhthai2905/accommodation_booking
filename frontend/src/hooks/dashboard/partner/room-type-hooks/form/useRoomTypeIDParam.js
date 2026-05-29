import { useParams, useNavigate } from "react-router"

export default function useRoomTypeIDParam() {
    const { id_room_type } = useParams()
    const navigate = useNavigate()


    return {
        id_room_type,
        navigate
    }
}