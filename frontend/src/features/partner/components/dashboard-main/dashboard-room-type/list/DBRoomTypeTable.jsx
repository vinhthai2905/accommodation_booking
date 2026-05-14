import DBRoomTypeTableColumn from "./DBRoomTypeTableColumn"
import DBRoomTypeRow from "./row/DBRoomTypeRow"


export default function DBRoomTypeTable({ filteredRooms }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBRoomTypeTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {filteredRooms.length === 0
                        ? (
                            <tr>
                                <td colSpan="8" className="p-12 text-center text-gray-500">
                                    Không có phòng nào phù hợp với yêu cầu tìm kiếm.
                                </td>
                            </tr>
                        )
                        : (
                            filteredRooms.map((room) => (
                                <DBRoomTypeRow key={room.id_room_type} initialRoom={room} />
                            ))
                        )}
                </tbody>
            </table>
        </div>
    )
}