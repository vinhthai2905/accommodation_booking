import { clsx } from "clsx"
import { useState } from "react"
import { Link } from "react-router"
import { LogOut } from "lucide-react"

import useClickOutside from "../../../../hooks/common/useClickOutside"
import { useAuthUserContext } from "../../../../hooks/authentication/common/useAuthUserContext"
import { parseFullName } from "../../../../helpers/common/parseFullName"

export default function AdminDashboardProfile() {
    const [isOpen, setIsOpen] = useState(false)
    const { ref } = useClickOutside(setIsOpen)
    const { user, clearAuthUserState } = useAuthUserContext()

    if (!user || !user.personal_info) return null;

    const userName = parseFullName(
        user.personal_info.first_name,
        user.personal_info.last_name
    )

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={clsx(
                    "flex items-center gap-2 text-left transition",
                    "rounded-md px-2 py-1.5",
                    "hover:bg-gray-100 hover:cursor-pointer"
                )}
            >
                <div className={clsx(
                    "h-8 w-8 p-0.5 rounded-full",
                    "bg-linear-to-tr from-[#003b95] to-blue-400"
                )}>
                    <div className={clsx(
                        "flex items-center justify-center w-full h-full",
                        "bg-white rounded-full text-sm font-bold text-[#003b95]"
                    )}>
                        {user.personal_info.first_name[0]}
                    </div>
                </div>

                <div className="leading-tight hidden sm:block">
                    <p className="text-sm font-semibold text-gray-900">
                        {userName}
                    </p>
                    <p className="text-xs text-gray-500">Admin</p>
                </div>
            </button>

            <div className={clsx(
                "w-48",
                "absolute right-0 top-[calc(100%+8px)] z-50",
                "transition-all duration-200 ease-out",
                "overflow-hidden rounded-xl bg-white",
                "shadow-[0_4px_20px_rgba(0,0,0,0.18)]",
                isOpen
                    ? "opacity-100 pointer-events-auto translate-y-0"
                    : "opacity-0 translate-y-3 pointer-events-none"
            )}>
                <Link
                    to="/auth/admin/sign-in"
                    className={clsx(
                        "w-full px-5 py-3 flex items-center gap-2",
                        "text-left text-[#1a1a1a] text-[0.8rem]",
                        "hover:bg-gray-100"
                    )}
                    onClick={clearAuthUserState}
                >
                    <LogOut size={18} strokeWidth={1.75} className="text-[#3d3d3d]" />
                    <span>Đăng xuất</span>
                </Link>
            </div>
        </div>
    )
}
