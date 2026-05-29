import { FaBed, FaCouch, FaChevronRight } from "react-icons/fa"
import { clsx } from "clsx"

function getDetailIcon(detail) {
    if (detail.toLowerCase().includes("sofa")) {
        return <FaCouch className="inline ml-1 text-sm text-gray-700" />
    }

    return <FaBed className="inline ml-1 text-sm text-gray-700" />
}

export default function RoomBedsColumn({ roomType }) {
    return (
        <div className="px-4 py-3">
            <div className="flex flex-col gap-1">
                <a
                    href="#"
                    className="text-sm font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors leading-tight"
                >
                    {roomType.type_name}
                </a>
                <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium">
                    <FaBed className="text-slate-400" size={14} />
                    <span>Sẵn có trong phòng</span>
                </div>
            </div>
        </div>
    )
}