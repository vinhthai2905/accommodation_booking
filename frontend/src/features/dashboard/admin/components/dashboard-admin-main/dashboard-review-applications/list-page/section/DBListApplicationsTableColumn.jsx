export default function DBListApplicationsTableColumn() {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
                <th scope="col" className="px-6 py-4">Khách sạn / Khu vực</th>
                <th scope="col" className="px-6 py-4">Đối tác (Email & SĐT)</th>
                <th scope="col" className="px-6 py-4">Tài liệu pháp lý</th>
                <th scope="col" className="px-6 py-4">Ngày đăng ký</th>
                <th scope="col" className="px-6 py-4">Trạng thái</th>
                <th scope="col" className="px-6 py-4 text-center">Thao tác</th>
            </tr>
        </thead>
    )
}
