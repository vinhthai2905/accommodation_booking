import { clsx } from "clsx"

export default function RoomAvailabilityHeaderRow() {
    return (
        <>
            <div className="px-4 py-3 font-bold text-white text-[11px] uppercase tracking-wider">
                Loại chỗ ở
            </div>

            <div className="px-4 py-3 font-bold text-white text-[11px] uppercase tracking-wider border-l border-blue-400/50">
                Sức chứa
            </div>
            
            <div className="px-4 py-3 font-bold text-white text-[11px] uppercase tracking-wider border-l border-blue-400/50">
                Giá phòng
            </div>

            <div className="px-4 py-3 font-bold text-white text-[11px] uppercase tracking-wider border-l border-blue-400/50">
                Chọn phòng
            </div>
        </>
    )
}