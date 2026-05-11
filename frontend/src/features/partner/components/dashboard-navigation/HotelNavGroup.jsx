import DashboardNavLink from "../../ui/DashboardNavLink"

import { clsx } from "clsx"
import { Hotel, ChevronDown, ChevronRight } from "lucide-react"
import { Link } from "react-router"

export default function HotelNavGroup({navStates, toggleHotelNav, closeAllNav, motion}) {
    return (
        <div>
            <button
                onClick={() => toggleHotelNav()}
                className={clsx(
                    "w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-gray-100 cursor-pointer",
                    navStates.hotel
                        ? "bg-blue-50 text-[#003b95]"
                        : "text-gray-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <Hotel size={20} className={clsx(
                        navStates.hotel ? "text-[#003b95]" : "text-gray-500"
                    )} />
                    <span className="font-medium">Khách sạn</span>
                </div>
                {navStates.hotel ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {navStates.hotel && (
                    <motion.div
                        layoutId="activePartnerIndicator"
                        className="absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full"
                    />
                )}
            </button>

            {navStates.hotel && (
                <div className="w-full pl-4 mt-1 space-y-1">
                    <DashboardNavLink
                        to={"/partner/dashboard/hotel/room-type"}
                        closeAllNav={closeAllNav}
                        label={"Thông tin"}
                    />
                </div>
            )}
        </div>
    )
}