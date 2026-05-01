import RoomBedsColumn from "./RoomBedsColumn"
import RoomGuestsColumn from "./RoomGuestsColumn"
import RoomPhysicalColumn from "./RoomPhysicalColumn"
import RoomPriceColumn from "./RoomPriceColumn"

export default function RoomRow({ roomType, selectedRooms, onRoomSelect }) {

    return (
        <div className="grid grid-cols-[0.28fr_0.22fr_0.28fr_0.32fr] border-t border-gray-300">
            <RoomBedsColumn roomType={roomType} />
            <RoomGuestsColumn roomType={roomType} />
            <RoomPriceColumn roomType={roomType}/>
            <RoomPhysicalColumn roomType={roomType} selectedRooms={selectedRooms} onRoomSelect={onRoomSelect} />
        </div>
    )
}