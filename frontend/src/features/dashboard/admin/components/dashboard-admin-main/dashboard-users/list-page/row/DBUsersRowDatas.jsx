import { clsx } from "clsx"
import { User } from "lucide-react"

export default function DBUsersRowDatas({ user }) {
    const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Chưa cập nhật"
    const displayName = user.hotel_name || fullName

    return (
        <>
            <td className="p-4 text-center">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </td>

            <td className="p-4 text-gray-600 font-medium">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono whitespace-nowrap overflow-hidden text-ellipsis block max-w-[80px]" title={user.id_user}>
                    {user.id_user.split('-')[0]}
                </span>
            </td>

            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200 overflow-hidden">
                        {user.hotel_image ? (
                            <img src={user.hotel_image} alt={displayName} className="w-full h-full object-cover" />
                        ) : (
                            <User size={18} />
                        )}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {displayName}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {user.email}
                        </p>
                    </div>
                </div>
            </td>

            <td className="p-4">
                <p className="text-sm font-medium text-gray-700">
                    {user.phone_number || "---"}
                </p>
            </td>

            <td className="p-4 text-center">
                <span className={clsx(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                    user.current_role?.role_name === "Khách hàng" ? "bg-gray-50 text-gray-700 border border-gray-200/80" :
                    user.current_role?.role_name === "Đối tác" ? "bg-purple-50 text-purple-700 border border-purple-200/80" :
                    "bg-blue-50 text-blue-700 border border-blue-200/80"
                )}>
                    {user.current_role?.role_name || "---"}
                </span>
            </td>

            <td className="p-4 text-center">
                <span className={clsx(
                    "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold",
                    user.is_active 
                        ? "bg-green-50 text-green-700" 
                        : "bg-rose-50 text-rose-700"
                )}>
                    {user.is_active ? "Hoạt động" : "Bị khóa"}
                </span>
            </td>
        </>
    )
}
