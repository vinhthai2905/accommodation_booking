import { clsx } from "clsx"

export default function BookingNumber({activeTab, tab, totalBookings}) {
    return (
        <span className={clsx(
            "ml-1.5 text-xs px-1.5 py-0.5 rounded-full",
            activeTab === tab.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
        )}>
            {totalBookings}
        </span>
    )
}