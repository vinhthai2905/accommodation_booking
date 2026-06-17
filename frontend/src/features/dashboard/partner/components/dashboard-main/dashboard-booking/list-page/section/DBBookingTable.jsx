import DBBookingTableColumn from "./DBBookingTableColumn"
import DBBookingRow from "../row/DBBookingRow"

export default function DBBookingTable({ bookings }) {
    return (
        <div className="overflow-auto flex-1">
            <table className="w-full text-left border-collapse">
                <DBBookingTableColumn />

                <tbody className="text-sm divide-y divide-gray-100">
                    {bookings.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="p-12 text-center text-gray-500">
                                Không có đơn đặt phòng nào phù hợp.
                            </td>
                        </tr>
                    ) : (
                        bookings.map((booking) => (
                            <DBBookingRow
                                key={booking.id_booking || booking.id_dat_phong}
                                booking={booking}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}