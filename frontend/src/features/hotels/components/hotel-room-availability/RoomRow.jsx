import RoomBedsColumn from "./RoomBedsColumn"
import RoomGuestsColumn from "./RoomGuestsColumn"
import RoomPhysicalColumn from "./RoomPhysicalColumn"
import RoomPriceColumn from "./RoomPriceColumn"

export default function RoomRow({ roomType, handleRoomSelection }) {
    return (
        <div className="grid grid-cols-[1.2fr_0.4fr_0.7fr_1fr] border-t border-slate-200 divide-x divide-slate-200">
            <RoomBedsColumn roomType={roomType} />
            <RoomGuestsColumn roomType={roomType} />
            <RoomPriceColumn roomType={roomType}/>
            <RoomPhysicalColumn roomType={roomType} handleRoomSelection={handleRoomSelection} />
        </div>
    )
}