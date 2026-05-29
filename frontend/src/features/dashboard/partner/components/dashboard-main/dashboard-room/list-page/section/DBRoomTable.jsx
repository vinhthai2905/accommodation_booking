import DBRoomTableColumn from "./DBRoomTableColumn"
import DBRoomTableRows from "./DBRoomTableRows"

export default function DBRoomTable({ filteredRooms }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBRoomTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {filteredRooms.length === 0
                        ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-500">
                                    Không có phòng nào phù hợp với yêu cầu tìm kiếm.
                                </td>
                            </tr>
                        ) 
                        : (
                            <DBRoomTableRows filteredRooms={filteredRooms} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
