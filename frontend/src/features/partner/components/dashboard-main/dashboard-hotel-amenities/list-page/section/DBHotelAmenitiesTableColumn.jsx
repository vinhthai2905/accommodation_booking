export default function DBHotelAmenitiesTableColumn() {
    return (
        <thead >
            <tr className="text-[13px] text-gray-500 border-b border-gray-200 bg-gray-50/50">
                <th className="p-4 w-12 text-center">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </th>
                <th className="p-4 font-medium whitespace-nowrap">ID tiện nghi</th>
                <th className="p-4 font-medium whitespace-nowrap">Tên tiện nghi</th>
                <th className="p-4 font-medium whitespace-nowrap">Danh mục</th>
                <th className="p-4 font-medium whitespace-nowrap">Phạm vi</th>
                <th className="p-4 font-medium text-center whitespace-nowrap w-32">Hành động</th>
            </tr>
        </thead >
    )
}
