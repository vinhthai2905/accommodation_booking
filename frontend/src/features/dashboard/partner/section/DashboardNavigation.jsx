import AnimatedSidebarDashboard from "../../../../components/ui/AnimatedSidebarDashboard"

import HotelNavGroup from "../components/dashboard-navigation/HotelNavGroup"
import HotelRoomTypeNavGroup from "../components/dashboard-navigation/HotelRoomTypeNavGroup"
import HotelImgNavGroup from "../components/dashboard-navigation/HotelImgNavGroup"
import HotelBookingNavGroup from "../components/dashboard-navigation/HotelBookingNavGroup"

import { clsx } from "clsx"
import { Link } from "react-router"
import { LogOut } from "lucide-react"

import useToggleNavSection from "../../../../hooks/dashboard/partner/useToggleNavSection"

export default function DashboardNavigation({ motion }) {
    const {
        navStates,
        toggleHotelNav,
        toggleImgNav,
        toggleBookingNav,
        toggleRoomTypeNav,
        closeAllNav
    } = useToggleNavSection()

    return (
        <AnimatedSidebarDashboard
            className="bg-white border-r border-gray-200 text-gray-900"
            motion={motion}
        >
            <div className="flex items-center gap-3 px-6 py-8">
                <Link
                    to={"/partner/dashboard"}
                    className={clsx(
                        "w-full p-2 mx-5 rounded-lg text-center",
                        "bg-[#003b95] hover:bg-blue-500"
                    )}
                >
                    <span className="font-bold text-white tracking-tight">
                        Partner Panel
                    </span>
                </Link>


            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                <HotelNavGroup
                    navStates={navStates}
                    toggleHotelNav={toggleHotelNav}
                    closeAllNav={closeAllNav}
                    motion={motion}
                />
                
                <HotelRoomTypeNavGroup
                    navStates={navStates}
                    toggleRoomTypeNav={toggleRoomTypeNav}
                    closeAllNav={closeAllNav}
                    motion={motion}
                />

                <HotelImgNavGroup
                    navStates={navStates}
                    toggleImgNav={toggleImgNav}
                    closeAllNav={closeAllNav}
                    motion={motion}
                />

                <HotelBookingNavGroup
                    navStates={navStates}
                    toggleBookingNav={toggleBookingNav}
                    closeAllNav={closeAllNav}
                    motion={motion}
                />


            </nav>

            <div className="p-4 border-t border-gray-200">
                <button className={clsx(
                    "flex items-center gap-3 w-full px-4 py-3 rounded-xl",
                    "text-red-500 hover:bg-red-50",
                    "transition-colors font-medium"
                )}>
                    <LogOut size={20} />
                    Đăng xuất
                </button>
            </div>

        </AnimatedSidebarDashboard>
    )
}