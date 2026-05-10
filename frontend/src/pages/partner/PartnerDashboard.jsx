import { clsx } from "clsx"
import { Bell } from "lucide-react"
import { Outlet } from "react-router"
import { motion } from "framer-motion"

import DashboardNavigation from "../../features/partner/section/DashboardNavigation"

export default function PartnerDashboard() {

    return (
        <div className={clsx(
            "flex h-screen w-full overflow-hidden",
            "font-sans text-gray-900 bg-gray-50"
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
                        <div className={clsx(
                            "h-8 w-8 p-0.5 rounded-full",
                            "bg-linear-to-tr from-[#003b95] to-blue-400"
                        )}>
                            <div className={clsx(
                                "flex items-center justify-center w-full h-full",
                                "bg-white rounded-full text-sm font-bold text-[#003b95]"
                            )}>
                                P
                            </div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}