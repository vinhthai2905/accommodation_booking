import AnimatedSidebarDashboard from '../ui/AnimatedSidebarDashboard'

import { clsx } from "clsx"
import { useState } from 'react'
import { LayoutDashboard, Users, Hotel, Settings, Bell, LogOut } from 'lucide-react'
import { Outlet, Link, useLocation } from 'react-router'
import { motion } from 'framer-motion'

export default function PartnerLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const location = useLocation()

    return (
        <div className={clsx(
            "flex h-screen w-full overflow-hidden",
            "font-sans text-gray-900 bg-gray-50"
        )}>

            {/* Sidebar */}
            <AnimatedSidebarDashboard
                className="bg-white border-r border-gray-200 text-gray-900"
            >
                <div className="flex items-center gap-3 px-6 py-8">
                    <div className="bg-[#003b95] p-2 rounded-lg">
                        <span className="font-bold text-white tracking-tight">P</span>
                    </div>
                    <span className="font-bold text-xl text-[#003b95] tracking-tight whitespace-nowrap">
                        Partner Panel
                    </span>
                </div>

                <nav className={clsx("flex-1 overflow-y-auto py-6 px-4 space-y-2")}>
                    {[
                        { name: 'Dashboard', path: '/partner/', icon: LayoutDashboard },
                        { name: 'Users', path: '/partner/users', icon: Users },
                        { name: 'Hotels & Listings', path: '/partner/hotels', icon: Hotel },
                        { name: 'Settings', path: '/partner/settings', icon: Settings },
                    ].map((item) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/partner/');
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={clsx(
                                    "relative flex items-center gap-3 px-4 py-3 rounded-xl",
                                    "transition-all duration-200",
                                    isActive
                                        ? "bg-blue-50 text-[#003b95]"
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                )}
                            >
                                <Icon size={20} className={isActive ? "text-[#003b95]" : "text-gray-500"} />
                                <span className={clsx("font-medium")}>{item.name}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activePartnerIndicator"
                                        className={clsx("absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full")}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className={clsx("p-4 border-t border-gray-200")}>
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

            {/* Main Content */}
            <main className={clsx("relative flex flex-col flex-1 h-screen overflow-hidden")}>
                {/* Header */}
                <header className={clsx(
                    "sticky top-0 z-30",
                    "flex items-center justify-between h-16 px-6",
                    "bg-white/80 backdrop-blur-md border-b border-gray-200"
                )}>
                    {/* Add toggle conditionally if needed, but not right now to keep simple */}
                    <div className={clsx("flex-1")} /> {/* Spacer */}

                    <div className={clsx("flex items-center gap-4")}>
                        <button className={clsx(
                            "relative p-2",
                            "text-gray-500 hover:text-[#003b95] transition-colors"
                        )}>
                            <Bell size={20} />
                            <span className={clsx("absolute top-1.5 right-1.5 w-2 h-2 bg-[#003b95] rounded-full")}></span>
                        </button>
                        <div className={clsx(
                            "h-8 w-8 p-0.5 rounded-full",
                            "bg-gradient-to-tr from-[#003b95] to-blue-400"
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

                {/* Scrollable Content Area */}
                <div className={clsx("flex-1 overflow-y-auto p-4 lg:p-8")}>
                    <div className={clsx("max-w-7xl mx-auto")}>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}