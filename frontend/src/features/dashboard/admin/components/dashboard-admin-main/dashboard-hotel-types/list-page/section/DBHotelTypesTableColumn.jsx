export default function DBHotelTypesTableColumn() {
    return (
        <thead className="bg-gray-50 border-b border-gray-100 sticky top-0 z-10">
            <tr>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs w-[40%]">
                    Tên loại khách sạn
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs w-[40%]">
                    Slug
                </th>
                <th className="px-6 py-4 font-semibold text-gray-600 uppercase tracking-wider text-xs text-center w-[20%]">
                    Thao tác
                </th>
            </tr>
        </thead>
    )
}
