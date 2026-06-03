import { clsx } from "clsx"
import { Key } from "lucide-react"

export default function DBRoomRowDatas({ room }) {
    return (
        <>
            <td className="p-4 text-center">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </td>

            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <Key size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {room.room_name}
                        </p>
                        {room.hotel_name && (
                            <p className="text-[11px] text-gray-500 mt-0.5 font-medium truncate max-w-xs">
                                {room.hotel_name}
                            </p>
                        )}
                    </div>
                </div>
            </td>

            <td className="p-4 text-gray-600 font-medium">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono">
                    ID: {room.id_room}
                </span>
            </td>

            <td className="p-4">
                {room.status === "AVAILABLE" && (
                    <span className={clsx(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                        "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                    )}>
                        Sẵn sàng
                    </span>
                )}
                {room.status === "MAINTENANCE" && (
                    <span className={clsx(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                        "bg-amber-50 text-amber-700 border border-amber-200/80"
                    )}>
                        Bảo trì
                    </span>
                )}
                {room.status === "BOOKED" && (
                    <span className={clsx(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                        "bg-red-50 text-red-700 border border-red-200/80"
                    )}>
                        Đã đặt
                    </span>
                )}
                {!room.status && (
                    <span className={clsx(
                        "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                        "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
                    )}>
                        Sẵn sàng
                    </span>
                )}
            </td>
        </>
    )
}
