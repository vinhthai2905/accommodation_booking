import BookingNumber from "../../ui/user-booking/BookingNumber"

import { clsx } from "clsx"

export default function BookingTabs({ isFetchingBookings, activeTab, setActiveTab, tabs, bookings }) {
    const currentTabTotalBookings = bookings?.length ?? 0;
    const hasBookings = currentTabTotalBookings > 0

    const shouldShowNumberBookings = (tab) => {
        return !isFetchingBookings && activeTab === tab.id && hasBookings;
    }

    return (
        <div className="flex gap-2 mb-8">
            {tabs.map((tab) => (

                <button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    className={clsx(
                        "px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200",
                        "cursor-pointer",
                        activeTab === tab.id
                            ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                            : "bg-white text-slate-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                    )}
                >
                    {tab.label}
                    {shouldShowNumberBookings(tab) && (
                        <BookingNumber
                            activeTab={activeTab}
                            tab={tab}
                            totalBookings={bookings.length}
                        />
                    )}
                </button>
            ))}
        </div>
    )
}