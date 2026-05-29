import RoomTableRow from "../row/DBRoomRow"

export default function DBRoomTableRows({ filteredRooms }) {
    return (
        filteredRooms.map((room) => (
            <RoomTableRow key={room.id_room} initialRoom={room} />
        ))
    )
}
