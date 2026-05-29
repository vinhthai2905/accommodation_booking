import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Hotel, Settings, BadgeCheckIcon } from 'lucide-react';
import { Link } from 'react-router';

import { clsx } from "clsx"

const navItems = [
    { name: 'Xét duyệt hồ sơ', path: '/admin/review-applications', icon: BadgeCheckIcon },
    { name: 'Người dùng', path: '/admin/users', icon: Users },
    { name: 'Phường', path: '/admin/wards', icon: Hotel },
    { name: 'Danh mục tiện ích', path: '/admin/category-amenities', icon: LayoutDashboard },
    { name: 'Tiện ích', path: '/admin/amenities', icon: Settings },
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
                                ? "bg-[#003b95]/10 text-[#003b95]"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        <Icon size={20} className={isActive ? "text-[#003b95]" : "text-gray-500"} />
                        <span className={clsx("font-medium")}>{item.name}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeIndicator"
                                className={clsx("absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full")}
                            />
                        )}
                    </Link>
                );
            })}
        </nav>
    )
}