import { useState } from "react"

export default function useToggleHotelSection() {
    const [isHotelOpen, setIsHotelOpen] = useState(false)
    const [isRoomTypeActive, setIsRoomTypeActive] = useState(false)

    return {
        isHotelOpen,
        setIsHotelOpen,
        isRoomTypeActive,
        setIsRoomTypeActive
    }
}