import { clsx } from "clsx"
import { BedDouble, Eye } from "lucide-react"
import { useNavigate } from "react-router"

import { createSlug } from "../../../../../../helpers/dashboard/partner/createSlug"

export default function DBRoomTypeRowDatas({ room }) {
    const navigate = useNavigate()

    return (
        <>
            <td className="p-4">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </td>

            <td className="p-4 text-left">
                <div className="flex items-center gap-3">
                    <div className={clsx(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        "bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-200/80 ",
                        "text-gray-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200",
                    )}>
                        <BedDouble size={20} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{room.type_name}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5 font-medium">ID: {room.id_room_type}</p>
                    </div>
                </div>
            </td>

            <td className="p-4 text-gray-600 font-medium">
                {room.max_capacity} Khách
            </td>

            <td className="p-4">
                <span className={clsx(
                    "text-[13px] font-semibold tracking-tight",
                    room.total_rooms > 5 ? "text-gray-700" : "text-amber-600"
                )}>
                    {room.total_rooms} {room.total_rooms <= 5 && room.total_rooms > 0 && "Low Stock"}
                    {room.total_rooms === 0 && <span className="text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-100">Out of Stock</span>}
                </span>
            </td>

            <td className="p-4 text-gray-900 font-semibold tracking-tight">
                {parseInt(room.price).toLocaleString('vi-VN')} đ
            </td>

            <td className="p-4">
                <span className={clsx(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                    room.total_rooms > 0
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                        : "bg-rose-50 text-rose-700 border border-rose-200/80"
                )}>
                    {room.total_rooms > 0 ? "Đang kinh doanh" : "Ngừng kinh doanh"}
                </span>
            </td>

            <td className="p-4 whitespace-nowrap">
                <button
                    type="button"
                    onClick={() => navigate(`/partner/dashboard/hotel/room-type/${createSlug(room.type_name)}/${room.id_room_type}/rooms`)}
                    className={clsx(
                        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold",
                        "bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors border border-blue-100/80 cursor-pointer shadow-xs"
                    )}
                >
                    <Eye size={14} />
                    <span>Xem</span>
                </button>
            </td>
        </>
    )
}