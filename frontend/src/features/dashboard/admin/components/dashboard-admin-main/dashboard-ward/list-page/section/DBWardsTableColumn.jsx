import { clsx } from "clsx"

export default function DBWardsTableColumn() {
    return (
        <thead className={clsx(
            "bg-gray-50/80",
            "text-xs font-semibold uppercase tracking-wider text-gray-600",
            "border-b border-gray-200/80"
        )}>
            <tr>
                <th className="p-4 w-12 text-center">
                    <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500/20"
                    />
                </th>
                <th className="p-4 font-bold text-gray-700">ID phường</th>
                <th className="p-4 font-bold text-gray-700">Tên phường</th>
                <th className="p-4 font-bold text-gray-700 text-center">Thành phố</th>
                <th className="p-4 font-bold text-gray-700 text-center">Slug</th>
                <th className="p-4 font-bold text-gray-700 text-center">Hành động</th>
            </tr>
        </thead>
    )
}
