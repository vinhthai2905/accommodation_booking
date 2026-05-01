import { clsx } from "clsx"
import { useState } from "react"
import RoomRow from "../components/RoomRow"
import RoomAvailabilityHeaderRow from "../components/RoomAvailabilityHeaderRow"

import useHotelDetails from "../../../hooks/hotel/useHotelDetails"

export default function RoomAvailability() {
    const { roomTypesQuery } = useHotelDetails()
    const { data: roomTypes } = roomTypesQuery

    const [selectedRooms, setSelectedRooms] = useState({})

    const handleRoomSelection = (roomTypeId, roomPrice, roomId, isSelected) => {
        setSelectedRooms(prev => {
            const next = { ...prev }
            if (isSelected) {
                next[roomId] = { roomTypeId, price: roomPrice }
            } else {
                delete next[roomId]
            }
            return next
        })
    }

    const selectedRoomIds = Object.keys(selectedRooms)
    const totalPrice = Object.values(selectedRooms).reduce((sum, room) => sum + room.price, 0)
    const totalSelected = selectedRoomIds.length

    return (
        <div className="flex flex-col gap-2 text-black">
            <h1 className="text-2xl font-bold">
                Phòng trống
            </h1>
            <div className={clsx(
                "flex overflow-hidden",
                "border border-gray-300 rounded-md",
                "bg-white text-sm"
            )}>
                <div className="flex-4 flex flex-col">
                    <div className={clsx(
                        "grid grid-cols-[0.28fr_0.22fr_0.28fr_0.32f",
                        "bg-[#4f79b6] text-white"
                    )}>
                        <RoomAvailabilityHeaderRow />
                    </div>

                    {roomTypes.map((roomType) => (
                        <RoomRow
                            key={roomType.id_room_type}
                            roomType={roomType}
                            selectedRooms={selectedRoomIds}
                            onRoomSelect={(roomId, isSelected) => {
                                handleRoomSelection(
                                    roomType.id_room_type,
                                    roomType.price,
                                    roomId,
                                    isSelected
                                )
                            }}
                        />
                    ))}

                </div>

                <div className="flex-1 flex flex-col border-l border-gray-300">
                    <div className="px-4 py-2 bg-[#4f79b6] text-white font-bold">
                        Thành tiền
                    </div>
                    <div className={clsx(
                        "flex-1 flex flex-col items-center justify-start gap-2",
                        "p-4",
                        "text-center"
                    )}>
                        {totalSelected > 0 ? (
                            <>
                                <span className="text-sm text-gray-600">
                                    {totalSelected} phòng
                                </span>
                                <span className="text-lg font-bold text-blue-600">
                                    VND {Intl.NumberFormat("vi-VN").format(totalPrice)}
                                </span>
                                <button className={clsx(
                                    "w-full mt-2 px-4 py-2",
                                    "bg-blue-600 hover:bg-blue-700 text-white",
                                    "font-bold rounded-md transition-colors"
                                )}>
                                    Đặt ngay
                                </button>
                            </>
                        ) : (
                            <span className="mt-4 text-sm text-gray-500">
                                Chưa chọn phòng
                            </span>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}