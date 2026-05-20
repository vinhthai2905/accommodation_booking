import { clsx } from "clsx"
import { Image, ChevronDown, ChevronRight } from "lucide-react"
import { Link } from "react-router"

export default function HotelImgNavGroup({navStates, toggleImgNav, closeAllNav, motion}) {
    return (
        <div>
            <button
                onClick={() => toggleImgNav()}
                className={clsx(
                    "w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-gray-100 cursor-pointer",
                    navStates.image
                        ? "bg-blue-50 text-[#003b95]"
                        : "text-gray-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <Image size={20} className={clsx(
                        navStates.image ? "text-[#003b95]" : "text-gray-500"
                    )} />
                    <span className="font-medium">Hình ảnh</span>
                </div>
                {navStates.image ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {navStates.image && (
                    <motion.div
                        layoutId="activePartnerIndicator"
                        className="absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full"
                    />
                )}
            </button>
            {navStates.image && (
                <div className="pl-4 mt-1 space-y-1">
                    <Link
                        to={"/partner/dashboard/hotel/room-type"}
                        className={clsx(
                            "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                            "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        Danh sách Khách sạn
                    </Link>

                </div>
            )}
        </div>
    )
}