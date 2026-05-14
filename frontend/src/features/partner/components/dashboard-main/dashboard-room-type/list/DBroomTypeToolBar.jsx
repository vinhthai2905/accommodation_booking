import DBRoomTypeToolBarButton from "../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeToolBarButton"

import { clsx } from "clsx"
import { Filter, Plus, Search } from "lucide-react"

export default function DBRoomTypeToolBar({ searchTerm, setSearchTerm }) {
    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-between gap-4 p-4",
                "border-b border-gray-200",
                "md:flex-row"
            )}
        >
            <div className="relative w-full md:w-80">
                <div
                    className={clsx(
                        "pointer-events-none absolute inset-y-0 left-0",
                        "flex items-center pl-3"
                    )}
                >
                    <Search size={18} className="text-gray-400" />
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    className={clsx(
                        "w-full rounded-lg px-4 py-2.5 pl-10 outline-none",
                        "border border-gray-300 bg-white",
                        "text-sm text-gray-900",
                        "transition-colors",
                        "focus:border-blue-500 focus:ring-blue-500"
                    )}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto">
                <DBRoomTypeToolBarButton>
                    <Filter size={16} />
                    Danh mục
                </DBRoomTypeToolBarButton>

                <DBRoomTypeToolBarButton>
                    Trạng thái
                </DBRoomTypeToolBarButton>

                <DBRoomTypeToolBarButton variant="primary" to={"new"}>
                    <Plus size={16} />
                    Thêm loại phòng mới
                </DBRoomTypeToolBarButton>
            </div>
        </div>
    )
}