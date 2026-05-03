// import useHotelDetailsContext from "../hotel/useHotelDetailsContext"

import { useState } from "react"

export default function useRoomSelected() {
    const [selectedRooms, setSelectedRooms] = useState({})

    const handleRoomSelection = (roomTypeId, roomPrice, roomName, roomId, isSelected) => {
        setSelectedRooms(prev => {
            const next = { ...prev }
            isSelected
                ? next[roomId] = { roomTypeId, price: roomPrice, roomName }
                : delete next[roomId]

            return next
        })
    }

    const selectedRoomIds = Object.keys(selectedRooms)
    const totalPrice = (
        Object
            .values(selectedRooms)
            .reduce((sum, room) => sum + Number(room.price), 0)
    )

    return {
        selectedRooms,
        setSelectedRooms,
        handleRoomSelection,
        selectedRoomIds,
        totalPrice,
    }
}