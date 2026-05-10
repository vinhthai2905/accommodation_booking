import { clsx } from "clsx"
import { Hotel, ChevronDown, ChevronRight } from "lucide-react"
import { Link } from "react-router"

export default function HotelNavGroup({isHotelOpen, setIsHotelOpen, isRoomTypeActive, motion}) {
    return (
        <div>
            <button
                onClick={() => setIsHotelOpen(!isHotelOpen)}
                className={clsx(
                    "w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-gray-100",
                    isHotelOpen
                        ? "bg-blue-50 text-[#003b95]"
                        : "text-gray-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <Hotel size={20} className={clsx(
                        isHotelOpen ? "text-[#003b95]" : "text-gray-500"
                    )} />
                    <span className="font-medium">Khách sạn</span>
                </div>
                {isHotelOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {isHotelOpen && (
                    <motion.div
                        layoutId="activePartnerIndicator"
                        className="absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full"
                    />
                )}
            </button>
            {isHotelOpen && (
                <div className="pl-11 pr-4 mt-1 space-y-1">
                    <Link
                        to={"/partner/dashboard/hotel/room-type"}
                        className={clsx(
                            "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            isRoomTypeActive
                                ? "bg-blue-100 text-[#003b95]"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        Danh sách Khách sạn
                    </Link>

                </div>
            )}
        </div>
    )
}