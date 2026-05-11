import DashboardNavLink from "../../ui/DashboardNavLink"

import { clsx } from "clsx"
import { BedDouble, ChevronDown, ChevronRight } from "lucide-react"

export default function HotelRoomTypeNavGroup({navStates, toggleRoomTypeNav, closeAllNav, motion}) {
    return (
        <div>
            <button
                onClick={() => toggleRoomTypeNav()}
                className={clsx(
                    "w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-gray-100 cursor-pointer",
                    navStates.roomType
                        ? "bg-blue-50 text-[#003b95]"
                        : "text-gray-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <BedDouble size={20} className={clsx(
                        navStates.roomType ? "text-[#003b95]" : "text-gray-500"
                    )} />
                    <span className="font-medium">Loại phòng</span>
                </div>
                {navStates.roomType ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {navStates.roomType && (
                    <motion.div
                        layoutId="activePartnerIndicator"
                        className="absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full"
                    />
                )}
            </button>

            {navStates.roomType && (
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