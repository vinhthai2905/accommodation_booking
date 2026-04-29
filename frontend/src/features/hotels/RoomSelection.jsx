import BookingRoomPicker from "./BookingRoomPicker"
import RoomAvailability from "./RoomAvailability"

export default function RoomSelection() {
    return (
        <div className="flex flex-col text-black gap-2">
            <h1 className="text-2xl font-bold">
                Phòng trống
            </h1>
            <RoomAvailability />
        </div>
    )
}