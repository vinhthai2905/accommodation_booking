import { clsx } from "clsx"

import { Link } from "react-router"
import { useContext } from "react"

import {
    CircleUserRound,
    BriefcaseBusiness,
    BadgeDollarSign,
    Wallet,
    MessageSquareText,
    Heart,
    LogOut,
} from "lucide-react"


import { AuthUserContext } from "../../context/AuthUserContext"

const menuItems = [
    { title: "My account", icon: CircleUserRound, to: "/profile" },
    { title: "Bookings & Trips", icon: BriefcaseBusiness, to:"/profile/mytrips.html" },
    { title: "Genius loyalty program", icon: BadgeDollarSign },
    { title: "Rewards & Wallet", icon: Wallet },
    { title: "Reviews", icon: MessageSquareText },
    { title: "Saved", icon: Heart },
    { title: "Sign out", icon: LogOut, to: "/index" },
]

export default function UserProfileDrop() {
    const { clearAuthUserState } = useContext(AuthUserContext)

    return (
        <div
            className={clsx(
                "overflow-hidden rounded-xl bg-white",
                "shadow-[0_4px_20px_rgba(0,0,0,0.18)]",
            )}
        >
            {menuItems.map((item) => {
                const Icon = item.icon

                return (
                    <Link
                        to={item.to}
                        key={item.title}
                        className={clsx(
                            "w-full px-5 py-3 flex items-center gap-2",
                            "text-left text-[#1a1a1a] text-[0.8rem]",
                            "hover:bg-gray-100"
                        )}
                        onClick={item.title === "Sign out" ? clearAuthUserState : ""}
                    >
                        <Icon size={18} strokeWidth={1.75} className="text-[#3d3d3d]" />
                        <span>{item.title}</span>
                    </Link>
                )
            })}
        </div>
    )
}