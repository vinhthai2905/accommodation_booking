import DashboardNavLink from "../ui/DashboardNavLink"

import { clsx } from "clsx"
import { ChevronDown, ChevronRight, CalendarCheck, History, XCircle } from "lucide-react"
import { Link } from "react-router"

export default function HotelBookingNavGroup({ navStates, toggleBookingNav, closeAllNav, motion }) {
    return (
        <div>
            <button
                onClick={() => toggleBookingNav()}
                className={clsx(
                    "w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-gray-100 cursor-pointer",
                    navStates.booking
                        ? "bg-blue-50 text-[#003b95]"
                        : "text-gray-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <History size={20} className={clsx(
                        navStates.booking ? "text-[#003b95]" : "text-gray-500"
                    )} />
                    <span className="font-medium">Đặt phòng</span>
                </div>
                {navStates.booking ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {navStates.booking && (
                    <motion.div
                        layoutId="activePartnerIndicator"
                        className="absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full"
                    />
                )}
            </button>
            {navStates.booking && (
                <div className="pl-4 mt-1 space-y-1">
                    <DashboardNavLink
                        to="/partner/dashboard/bookings/upcoming"
                        closeAllNav={closeAllNav}
                        label="Sắp tới"
                    />
                    <DashboardNavLink
                        to="/partner/dashboard/bookings/past"
                        closeAllNav={closeAllNav}
                        label="Đã qua"
                    />
                    <DashboardNavLink
                        to="/partner/dashboard/bookings/cancelled"
                        closeAllNav={closeAllNav}
                        label="Đã hủy"
                    />
                </div >
            )}
        </div >
    )
}