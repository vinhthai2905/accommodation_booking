import { clsx } from "clsx"
import { Bell } from "lucide-react"
import { Outlet } from "react-router"
import { motion } from "framer-motion"

import DashboardNavigation from "../../features/partner/section/DashboardNavigation"
import DashboardProfile from "../../features/partner/section/DashboardProfile"

export default function PartnerDashboard() {

    return (
        <div className={clsx(
            "flex h-screen w-full overflow-hidden",
            "font-sans text-gray-900 bg-white"
        )}>

            <DashboardNavigation motion={motion} />

            <main className="relative flex flex-col flex-1 h-screen overflow-hidden">
                <header className={clsx(
                    "sticky top-0 z-30",
                    "flex items-center justify-between h-16 px-6",
                    "bg-white/80 backdrop-blur-md border-b border-gray-200"
                )}>
                    <div className="flex-1" />

                    <div className="flex items-center gap-4" >
                        <button className={clsx(
                            "relative p-2",
                            "text-gray-500 hover:text-[#003b95] transition-colors"
                        )}>
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#003b95] rounded-full"></span>
                        </button>
                        
                        <DashboardProfile />
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto bg-white p-4 lg:p-8 flex flex-col">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}