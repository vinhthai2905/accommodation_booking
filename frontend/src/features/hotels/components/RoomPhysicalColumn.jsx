import { clsx } from "clsx"
import useBookingContext from "../../../hooks/common/useBookingContext"

export default function RoomPhysicalColumn({ roomType, handleRoomSelection }) {
    const { selectedRoomIds } = useBookingContext()
    const availableRooms = roomType?.available_rooms || [];
    const roomTypeId = roomType.id_room_type
    const roomPrice = roomType.price
    const roomCapacity = roomType.max_capacity

    return (
        <div className="px-4 py-3">
            {availableRooms.length > 0
                ? (
                    <div className="flex max-h-40 flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                        {availableRooms.map((room) => (
                            <label
                                key={room.id_room}
                                className="group flex cursor-pointer items-center gap-3 text-xs text-slate-600 hover:text-blue-600 transition-colors"
                            >
                                <div className="relative flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedRoomIds.includes(String(room.id_room))}
                                        value={room.id_room}
                                        onChange={(e) => {
                                            handleRoomSelection(
                                                roomTypeId, 
                                                roomPrice,
                                                roomCapacity,
                                                room.room_name, 
                                                room.id_room, 
                                                e.currentTarget.checked
                                            )
                                        }}
                                        className={clsx(
                                            "h-4 w-4 rounded border-slate-300",
                                            "text-blue-600 focus:ring-blue-500 focus:ring-offset-0",
                                            "transition-all cursor-pointer"
                                        )}
                                    />
                                </div>
                                <span>{room.room_name}</span>
                            </label>
                        ))}
                    </div>
                )
                : (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1.5 rounded-lg w-fit">
                        <span className="text-[10px] font-bold uppercase tracking-wider">Hết phòng</span>
                    </div>
                )}
        </div>
    );
}