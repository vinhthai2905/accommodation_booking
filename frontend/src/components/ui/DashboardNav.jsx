import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Hotel, Settings } from 'lucide-react';
import { Link } from 'react-router';

import { clsx } from "clsx"

const navItems = [
    { name: 'Dashboard', path: '/partner/', icon: LayoutDashboard },
    { name: 'Users', path: '/partner/users', icon: Users },
    { name: 'Hotels & Listings', path: '/partner/hotels', icon: Hotel },
    { name: 'Settings', path: '/partner/settings', icon: Settings },
];

export default function DashboardNav({ location }) {
    return (
        <nav className={clsx("flex-1 overflow-y-auto py-6 px-4 space-y-2")}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={clsx(
                            "relative flex items-center gap-3 px-4 py-3 rounded-xl",
                            "transition-all duration-200",
                            isActive
                                ? "bg-blue-600/10 text-blue-400"
                                : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                        )}
                    >
                        <Icon size={20} className={isActive ? "text-blue-400" : ""} />
                        <span className={clsx("font-medium")}>{item.name}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                className={clsx("absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full")}
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    )
}