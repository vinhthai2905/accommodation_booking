import clsx from "clsx"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function DBBookingPagination({ bookings }) {
    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-between gap-4 p-4",
                "border-t border-gray-200",
                "text-[13px] text-gray-500",
                "sm:flex-row"
            )}
        >
            <div className="flex items-center gap-2">
                <span>
                    Result 1-{Math.min(10, bookings.length)} of{" "}
                    {bookings.length}
                </span>

                <select
                    className={clsx(
                        "ml-2 rounded px-2 py-1 outline-none",
                        "border border-gray-300 bg-white",
                        "text-gray-700",
                        "focus:border-blue-500"
                    )}
                >
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>

            <div className="flex items-center gap-1.5">
                <button className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:opacity-50">
                    <ChevronLeft size={14} />
                    <span>Trước</span>
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded border border-blue-600 bg-blue-50 font-medium text-blue-600">
                    1
                </button>

                <button className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50">
                    <span>Tiếp theo</span>
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    )
}