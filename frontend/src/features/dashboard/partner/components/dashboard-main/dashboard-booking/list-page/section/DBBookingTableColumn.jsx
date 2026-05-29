export default function DBBookingTableColumn() {
    return (
        <thead>
            <tr className="text-sm text-center text-gray-500 border-b border-gray-200 bg-gray-50/50">
                <th className="p-4 w-12 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </th>
                <th className="text-left p-4 font-medium whitespace-nowrap">Mã đặt phòng</th>
                <th className="text-left p-4 font-medium whitespace-nowrap">Khách hàng</th>
                <th className="p-4 font-medium whitespace-nowrap">Ngày nhận</th>
                <th className="p-4 font-medium whitespace-nowrap">Ngày trả</th>
                <th className="p-4 font-medium whitespace-nowrap">Tổng tiền</th>
                <th className="p-4 font-medium whitespace-nowrap">Thanh toán</th>
                <th className="p-4 font-medium whitespace-nowrap">Trạng thái</th>
                <th className="p-4 font-medium text-center whitespace-nowrap">Khác</th>
            </tr>
        </thead>
    )
}