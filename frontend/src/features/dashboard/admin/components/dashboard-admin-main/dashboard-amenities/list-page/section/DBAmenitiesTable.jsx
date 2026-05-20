import DBAmenitiesTableColumn from "./DBAmenitiesTableColumn"
import DBAmenitiesTableRows from "./DBAmenitiesTableRows"

export default function DBAmenitiesTable({ filteredAmenities }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBAmenitiesTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {filteredAmenities.length === 0
                        ? (
                            <tr>
                                <td colSpan="6" className="p-12 text-center text-gray-500">
                                    Không có tiện nghi nào phù hợp với yêu cầu tìm kiếm.
                                </td>
                            </tr>
                        ) 
                        : (
                            <DBAmenitiesTableRows filteredAmenities={filteredAmenities} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
