import AnimatedSidebarDashboard from "../../../../components/ui/AnimatedSidebarDashboard"

import HotelNavGroup from "../components/dashboard-navigation/HotelNavGroup"
import HotelRoomTypeNavGroup from "../components/dashboard-navigation/HotelRoomTypeNavGroup"
import HotelBookingNavGroup from "../components/dashboard-navigation/HotelBookingNavGroup"
import HotelPolicyNavGroup from "../components/dashboard-navigation/HotelPolicyNavGroup"

import { clsx } from "clsx"
import { Link } from "react-router"

import useToggleNavSection from "../../../../hooks/dashboard/partner/useToggleNavSection"

export default function DashboardNavigation() {
    const {
        navStates,
        toggleHotelNav,
        toggleImgNav,
        toggleBookingNav,
        toggleRoomTypeNav,
        togglePolicyNav,
        closeAllNav
    } = useToggleNavSection()

    return (
        <AnimatedSidebarDashboard
            className="bg-white border-r border-gray-200 text-gray-900"
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
                    
                />
                
                <HotelRoomTypeNavGroup
                    navStates={navStates}
                    toggleRoomTypeNav={toggleRoomTypeNav}
                    closeAllNav={closeAllNav}
                    
                />



                <HotelBookingNavGroup
                    navStates={navStates}
                    toggleBookingNav={toggleBookingNav}
                    closeAllNav={closeAllNav}
                    
                />

                <HotelPolicyNavGroup
                    navStates={navStates}
                    togglePolicyNav={togglePolicyNav}
                    closeAllNav={closeAllNav}
                />

            </nav>

        </AnimatedSidebarDashboard>
    )
}