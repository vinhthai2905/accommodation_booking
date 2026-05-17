import DBHotelCategoryAmenitiesTableColumn from "./DBHotelCategoryAmenitiesTableColumn"
import DBHotelCategoryAmenitiesTableRows from "./DBHotelCategoryAmenitiesTableRows"

export default function DBHotelCategoryAmenitiesTable({ filteredAmenities }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBHotelCategoryAmenitiesTableColumn />

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
                            <DBHotelCategoryAmenitiesTableRows filteredAmenities={filteredAmenities} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
