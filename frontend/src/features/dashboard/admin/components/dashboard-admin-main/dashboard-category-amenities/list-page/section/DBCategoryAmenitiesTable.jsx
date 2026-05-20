import DBCategoryAmenitiesTableColumn from "./DBCategoryAmenitiesTableColumn"
import DBCategoryAmenitiesTableRows from "./DBCategoryAmenitiesTableRows"

export default function DBCategoryAmenitiesTable({ filteredAmenities }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBCategoryAmenitiesTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {filteredAmenities.length === 0
                        ? (
                            <tr>
                                <td colSpan="5" className="p-12 text-center text-gray-500">
                                    Không có danh mục tiện nghi nào phù hợp với yêu cầu tìm kiếm.
                                </td>
                            </tr>
                        ) 
                        : (
                            <DBCategoryAmenitiesTableRows filteredAmenities={filteredAmenities} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
