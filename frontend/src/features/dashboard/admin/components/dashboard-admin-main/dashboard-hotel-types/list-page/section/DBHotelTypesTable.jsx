import DBHotelTypesTableColumn from "./DBHotelTypesTableColumn"
import DBHotelTypesTableRows from "./DBHotelTypesTableRows"

export default function DBHotelTypesTable({ filteredHotelTypes }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBHotelTypesTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {filteredHotelTypes.length === 0
                        ? (
                            <tr>
                                <td colSpan="3" className="p-12 text-center text-gray-500">
                                    Không có loại khách sạn nào phù hợp với yêu cầu tìm kiếm.
                                </td>
                            </tr>
                        ) 
                        : (
                            <DBHotelTypesTableRows filteredHotelTypes={filteredHotelTypes} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
