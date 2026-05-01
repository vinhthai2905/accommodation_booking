import { clsx } from "clsx"

export default function RoomPhysicalColumn({ roomType, handleRoomSelection }) {
    const availableRooms = roomType?.available_rooms || [];
    const roomTypeId = roomType.id_room_type
    const roomPrice = roomType.price

    return (
        <div className="border-l border-blue-300 p-4">
            {availableRooms.length > 0
                ? (
                    <div className="flex max-h-32 flex-col gap-2 overflow-y-auto pr-2">
                        {availableRooms.map((room) => (
                            <label
                                key={room.id_room}
                                className="flex cursor-pointer items-center gap-2 text-sm"
                            >
                                <input
                                    type="checkbox"
                                    value={room.id_room}
                                    onChange={(e) => {
                                        handleRoomSelection(roomTypeId, roomPrice, room.room_name, room.id_room, e.currentTarget.checked)
                                    }}
                                    className={clsx(
                                        "h-4 w-4 rounded border-gray-300",
                                        "text-blue-600 focus:ring-blue-500",
                                        "cursor-pointer"
                                    )}
                                />
                                <span>{room.room_name}</span>
                            </label>
                        ))}
                    </div>
                )
                : (
                    <span className="text-sm italic text-gray-500">Hết phòng</span>
                )}
        </div>
    );
}