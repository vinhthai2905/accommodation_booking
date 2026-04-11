import { clsx } from "clsx"

import {
    CircleUserRound,
    BriefcaseBusiness,
    BadgeDollarSign,
    Wallet,
    MessageSquareText,
    Heart,
    LogOut,
} from "lucide-react"

const menuItems = [
    { title: "My account", icon: CircleUserRound },
    { title: "Bookings & Trips", icon: BriefcaseBusiness },
    { title: "Genius loyalty program", icon: BadgeDollarSign },
    { title: "Rewards & Wallet", icon: Wallet },
    { title: "Reviews", icon: MessageSquareText },
    { title: "Saved", icon: Heart },
    { title: "Sign out", icon: LogOut },
]

export default function UserProfileDrop() {
    return (
        <div className={clsx(
            "overflow-hidden rounded-xl bg-white",
            "shadow-[0_4px_20px_rgba(0,0,0,0.18)]",
        )}>
            {menuItems.map((item) => {
                const Icon = item.icon

                return (
                    <button
                        key={item.title}
                        type="button"
                        className={clsx(
                            "w-full px-5 py-3 flex items-center gap-2",
                            "text-left text-[#1a1a1a] text-[0.8rem]",
                            "hover:bg-gray-100"
                        )}
                    >
                        <Icon size={18} strokeWidth={1.75} className="text-[#3d3d3d]" />
                        <span>{item.title}</span>
                    </button>
                )
            })}
        </div>
    )
}