import RoomDetailsColumn from "./RoomDetailsColumn"
import RoomGuestsColumn from "./RoomGuestsColumn"
import RoomPhysicalColumn from "./RoomPhysicalColumn"
import RoomPriceColumn from "./RoomPriceColumn"

export default function RoomRow({ roomType }) {
    return (
        <div className="grid grid-cols-[0.3fr_0.3fr_0.3fr_0.5fr] border-t border-gray-300">
            <RoomDetailsColumn roomType={roomType} />
            <RoomGuestsColumn roomType={roomType} />
            <RoomPriceColumn roomType={roomType}/>
            <RoomPhysicalColumn roomType={roomType} />
        </div>
    )
}