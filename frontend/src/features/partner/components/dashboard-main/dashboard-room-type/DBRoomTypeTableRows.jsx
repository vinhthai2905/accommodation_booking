import RoomTableRow from "./row/DBRoomTypeRow"

export default function DBRoomTypeTableRows({ filteredRooms }) {
    return (
        filteredRooms.map((room) => (
            <RoomTableRow key={room.id_room_type} initialRoom={room} />
        ))
    )
}

