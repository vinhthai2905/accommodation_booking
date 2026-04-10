import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import {
    CircleUserRound,
    BriefcaseBusiness,
    BadgeDollarSign,
    Wallet,
    MessageSquareText,
    Heart,
    LogOut,
    ChevronDown,
} from "lucide-react"

const menuItems = [
    { title: "My account", to: "/account", icon: CircleUserRound },
    { title: "Bookings & Trips", to: "/bookings", icon: BriefcaseBusiness },
    { title: "Genius loyalty program", to: "/genius", icon: BadgeDollarSign },
    { title: "Rewards & Wallet", to: "/wallet", icon: Wallet },
    { title: "Reviews", to: "/reviews", icon: MessageSquareText },
    { title: "Saved", to: "/saved", icon: Heart },
]

function getInitial(name = "") {
    return name.trim().charAt(0).toUpperCase() || "U"
}

export default function UserNav({
    user = { name: "Vinh Thai", level: "Genius Level 1" },
    onLogout,
}) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div ref={containerRef} className="relative">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-white/10"
            >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-yellow-400 bg-purple-500 text-sm font-medium text-white">
                    {getInitial(user.name)}
                </div>

                <div className="text-left leading-tight">
                    <p className="text-sm font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-yellow-300">{user.level}</p>
                </div>

                <ChevronDown
                    size={16}
                    className={`text-white transition ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-[232px] overflow-hidden rounded-xl bg-white py-2 shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
                    {menuItems.map((item) => {
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.title}
                                to={item.to}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-[15px] text-[#1a1a1a] transition hover:bg-gray-100"
                            >
                                <Icon size={18} className="text-[#3d3d3d]" />
                                <span>{item.title}</span>
                            </Link>
                        )
                    })}

                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false)
                            onLogout?.()
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-[15px] text-[#1a1a1a] transition hover:bg-gray-100"
                    >
                        <LogOut size={18} className="text-[#3d3d3d]" />
                        <span>Sign out</span>
                    </button>
                </div>
            )}
        </div>
    )
}