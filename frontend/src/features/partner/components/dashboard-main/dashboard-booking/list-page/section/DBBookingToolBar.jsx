import DBRoomTypeToolBarButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeToolBarButton"

import { clsx } from "clsx"
import { Filter, Search } from "lucide-react"

export default function DBBookingToolBar({ searchTerm, setSearchTerm, currentTab, setCurrentTab }) {
    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-between gap-4 p-4",
                "border-b border-gray-200",
                "md:flex-row"
            )}
        >
            <div className="relative w-full md:w-80">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search size={18} className="text-gray-400" />
                </div>

                <input
                    type="text"
                    placeholder="Search booking..."
                    className={clsx(
                        "w-full rounded-lg px-4 py-2.5 pl-10 outline-none",
                        "border border-gray-300 bg-white text-sm text-gray-900",
                        "transition-colors focus:border-blue-500 focus:ring-blue-500"
                    )}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
                <DBRoomTypeToolBarButton>
                    <Filter size={16} />
                    Bộ lọc
                </DBRoomTypeToolBarButton>

                <select
                    value={currentTab}
                    onChange={(e) => setCurrentTab(e.target.value)}
                    className={clsx(
                        "rounded-lg border border-gray-300 bg-white px-4 py-2.5",
                        "text-sm font-medium text-gray-700 outline-none",
                        "focus:border-blue-500"
                    )}
                >
                    <option value="upcoming">Sắp tới</option>
                    <option value="past">Đã qua</option>
                    <option value="cancelled">Đã hủy</option>
                </select>
            </div>
        </div>
    )
}