import DBHotelAmenitiesTableColumn from "./DBHotelAmenitiesTableColumn"
import DBHotelAmenitiesTableRows from "./DBHotelAmenitiesTableRows"

export default function DBHotelAmenitiesTable({ filteredAmenities }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBHotelAmenitiesTableColumn />

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
                            <DBHotelAmenitiesTableRows filteredAmenities={filteredAmenities} />
                        )}
                </tbody>
            </table>
        </div>
    )
}
