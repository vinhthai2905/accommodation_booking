import AnimatedSidebarDashboard from "../../../components/ui/AnimatedSidebarDashboard"

import { clsx } from "clsx"
import { Link } from "react-router"
import { LayoutDashboard, Users, Hotel, Settings, LogOut, ChevronDown, ChevronRight } from "lucide-react"

import useToggleHotelSection from "../../../hooks/dashboard/partner/useToggleHotelSection"
import HotelNavGroup from "../components/HotelNavGroup"

export default function DashboardNavigation({ motion }) {
    const { isHotelOpen, setIsHotelOpen } = useToggleHotelSection()

    const isRoomTypeActive = location.pathname === "/partner/dashboard/hotel/room-type"

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
                    isHotelOpen={isHotelOpen} 
                    setIsHotelOpen={setIsHotelOpen} 
                    isRoomTypeActive={isRoomTypeActive}
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
                    Logout
                </button>
            </div>

        </AnimatedSidebarDashboard>
    )
}