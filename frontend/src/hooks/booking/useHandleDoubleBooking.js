import { useContext } from "react"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router"

import { BookingContext } from "../../context/booking/BookingContext"

export default function useHandleDoubleBooking() {
    const navigate = useNavigate()
    const { setSelectedRooms } = useContext(BookingContext)

    const handleDoubleBookingError = (bookedRoomIds, bookingFormPayload) => {
        toast.error("Phòng này đã có người đặt trước! Vui lòng chọn phòng khác.")
        
        if (bookedRoomIds && bookedRoomIds.length > 0 && setSelectedRooms) {
            setSelectedRooms(prev => {
                const next = { ...prev }
                bookedRoomIds.forEach(id => {
                    delete next[id]
                })
                return next
            })
        }
        
        const searchParams = new URLSearchParams(window.location.search)
        const slug = searchParams.get("slug")
        const hotelId = searchParams.get("hotel_id") || bookingFormPayload?.hotelSelection?.hotelId
        
        if (slug && hotelId) {
            searchParams.delete("slug")
            searchParams.delete("hotel_id")
            navigate(`/hotel/${slug}/${hotelId}?${searchParams.toString()}`)
        } else if (hotelId) {
            navigate(`/hotel/detail/${hotelId}`)
        }
    }

    return { handleDoubleBookingError }
}
