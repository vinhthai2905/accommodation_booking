// import useHotelDetailsContext from "../hotel/useHotelDetailsContext"

import { useState } from "react"

export default function useRoomSelected() {
    const [selectedRooms, setSelectedRooms] = useState({})

    const handleRoomSelection = (roomTypeId, roomPrice, roomCapacity, roomName, roomId, isSelected) => {
        setSelectedRooms(prev => {
            const next = { ...prev }
            isSelected
                ? next[roomId] = { roomTypeId, price: roomPrice, roomName, roomCapacity: roomCapacity }
                : delete next[roomId]

            return next
        })
    }

    const selectedRoomIds = Object.keys(selectedRooms)

    const maxCapacitySelected = (
        Object
        .values(selectedRooms)
        .reduce((sumCapacity, room) => sumCapacity + room.roomCapacity, 0)
    )

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
        maxCapacitySelected
    }
}