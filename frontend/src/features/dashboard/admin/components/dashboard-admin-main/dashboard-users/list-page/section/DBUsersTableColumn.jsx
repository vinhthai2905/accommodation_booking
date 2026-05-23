import { clsx } from "clsx"

export default function DBUsersTableColumn() {
    return (
        <thead className="bg-gray-50/80 sticky top-0 z-10 shadow-sm backdrop-blur-sm">
            <tr>
                <th className="p-4 w-12 text-center border-b border-gray-200">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                </th>
                <th className="p-4 text-xs font-bold tracking-wider text-gray-500 uppercase border-b border-gray-200">
                    ID
                </th>
                <th className="p-4 text-xs font-bold tracking-wider text-gray-500 uppercase border-b border-gray-200">
                    Người dùng
                </th>
                <th className="p-4 text-xs font-bold tracking-wider text-gray-500 uppercase border-b border-gray-200">
                    Liên hệ
                </th>
                <th className="p-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase border-b border-gray-200">
                    Vai trò
                </th>
                <th className="p-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase border-b border-gray-200">
                    Trạng thái
                </th>
                <th className="p-4 w-20 text-center border-b border-gray-200"></th>
            </tr>
        </thead>
    )
}
