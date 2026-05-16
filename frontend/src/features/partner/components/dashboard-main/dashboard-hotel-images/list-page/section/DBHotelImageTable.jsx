import DBHotelImageTableColumn from "./DBHotelImageTableColumn"
import DBHotelImageTableRows from "./DBHotelImageTableRows"

export default function DBHotelImageTable({ filteredImages }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBHotelImageTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {filteredImages.length === 0
                        ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-500">
                                    Không có hình ảnh nào phù hợp với yêu cầu tìm kiếm.
                                </td>
                            </tr>
                        )
                        : (
                            <DBHotelImageTableRows filteredImages={filteredImages} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
