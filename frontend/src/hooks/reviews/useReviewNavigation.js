import { useNavigate, useLocation, useParams } from "react-router"

export function useReviewNavigation() {
    const navigate = useNavigate()
    const location = useLocation()
    const { id_booking } = useParams()
    const hotelName = location.state?.hotelName || "Khách sạn"

    return {
        navigate,
        location,
        bookingID: id_booking,
        hotelName
    }
}