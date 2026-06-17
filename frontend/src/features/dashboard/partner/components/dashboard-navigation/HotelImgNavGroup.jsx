import { clsx } from "clsx"
import { Image } from "lucide-react"
import { Link, useLocation } from "react-router"
import { motion } from "framer-motion"

export default function HotelImgNavGroup({ closeAllNav }) {
    const location = useLocation()
    const isActive = location.pathname.includes("/partner/dashboard/hotel/images")

    return (
        <div>
            <Link
                to="/partner/dashboard/hotel/images"
                onClick={() => {
                    if (closeAllNav) closeAllNav()
                }}
                className={clsx(
                    "w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-gray-100 cursor-pointer",
                    isActive
                        ? "bg-blue-50 text-[#003b95]"
                        : "text-gray-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <Image size={20} className={clsx(
                        isActive ? "text-[#003b95]" : "text-gray-500"
                    )} />
                    <span className="font-medium">Hình ảnh</span>
                </div>
                
                {isActive && (
                    <motion.div
                        layoutId="activePartnerIndicator"
                        className="absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full"
                    />
                )}
            </Link>
        </div>
    )
}