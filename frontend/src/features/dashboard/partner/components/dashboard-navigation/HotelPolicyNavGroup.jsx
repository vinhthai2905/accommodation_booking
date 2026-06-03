import DashboardNavLink from "../../ui/dashboard-nav/DashboardNavLink"

import { clsx } from "clsx"
import { ShieldCheck, ChevronDown, ChevronRight } from "lucide-react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"

export default function HotelPolicyNavGroup({navStates, togglePolicyNav, closeAllNav }) {
    return (
        <div>
            <button
                onClick={() => togglePolicyNav()}
                className={clsx(
                    "w-full relative flex items-center justify-between px-4 py-3 rounded-xl transition-colors",
                    "hover:bg-gray-100 cursor-pointer",
                    navStates.policy
                        ? "bg-blue-50 text-[#003b95]"
                        : "text-gray-600"
                )}
            >
                <div className="flex items-center gap-3">
                    <ShieldCheck size={20} className={clsx(
                        navStates.policy ? "text-[#003b95]" : "text-gray-500"
                    )} />
                    <span className="font-medium">Chính sách</span>
                </div>
                {navStates.policy ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                {navStates.policy && (
                    <motion.div
                        layoutId="activePartnerIndicator"
                        className="absolute left-0 w-1 h-8 bg-[#003b95] rounded-r-full"
                    />
                )}
            </button>

            {navStates.policy && (
                <div className="w-full pl-4 mt-1 space-y-1">
                    <DashboardNavLink
                        to={"/partner/dashboard/hotel/policy/children"}
                        closeAllNav={closeAllNav}
                        label={"Trẻ em"}
                    />

                    <DashboardNavLink
                        to={"/partner/dashboard/hotel/policy/refund"}
                        closeAllNav={closeAllNav}
                        label={"Hoàn tiền"}
                    />
                </div>

                
            )}
        </div>
    )
}