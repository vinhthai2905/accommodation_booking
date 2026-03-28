import BookingRoomPicker from "./BookingRoomPicker"
import RoomAvailability from "./RoomAvailability"

export default function RoomSelection() {
    return (
        <div className="flex flex-col text-black gap-2">
            <BookingRoomPicker />
            <RoomAvailability />
        </div>
    )
}