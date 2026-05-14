import { clsx } from "clsx"
import { ClipboardList, Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"

import { createSlug } from "../../../../../../../helpers/dashboard/partner/createSlug"

export default function DBRoomTypeRowActions({ setIsMenuOpen, setIsEditModalOpen, setIsDeleteModalOpen, room }) {
    const navigate = useNavigate()

    return (
        <div className={clsx(
            "absolute right-12 top-4 z-50 w-44 rounded-xl bg-white p-1.5",
            "shadow-[0_12px_30px_-10px_rgba(0,0,0,0.2)] border border-gray-100/80 ring-1 ring-black/5",
            "transition-all duration-150 origin-top-right text-left"
        )}>
            <button
                onClick={() => {
                    setIsMenuOpen(false)
                    navigate(`/partner/dashboard/hotel/room-type/${createSlug(room.type_name)}/${room.id_room_type}/details`)
                }}
                className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700",
                    "hover:bg-violet-50 hover:text-violet-600 transition-all duration-150 cursor-pointer group/btn"
                )}
            >
                <ClipboardList size={15} className="text-gray-400 group-hover/btn:text-violet-600 transition-colors" />
                <span>Chi tiết phòng</span>
            </button>

            <div className="my-1 h-px bg-gray-50" />

            <button
                onClick={() => {
                    setIsMenuOpen(false)
                    navigate(`/partner/dashboard/hotel/room-type/${createSlug(room.type_name)}/${room.id_room_type}/edit`)
                }}
                className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-gray-700",
                    "hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 cursor-pointer group/btn"
                )}
            >
                <Pencil size={15} className="text-gray-400 group-hover/btn:text-blue-600 transition-colors" />
                <span>Chỉnh sửa</span>
            </button>

            <div className="my-1 h-px bg-gray-50" />

            <button
                onClick={() => {
                    setIsMenuOpen(false)
                    setIsDeleteModalOpen(true)
                }}
                className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold text-rose-600",
                    "hover:bg-rose-50 transition-all duration-150 cursor-pointer group/btn"
                )}
            >
                <Trash2 size={15} className="text-rose-400 group-hover/btn:text-rose-600 transition-colors" />
                <span>Xóa</span>
            </button>
        </div>
    )
}