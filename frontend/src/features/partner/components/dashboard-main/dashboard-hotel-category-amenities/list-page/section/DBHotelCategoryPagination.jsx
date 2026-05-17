import { ChevronLeft, ChevronRight } from "lucide-react"
import { clsx } from "clsx"

export default function DBHotelCategoryPagination({ filteredCategories }) {
    return (
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50/50">
            <div className="text-sm text-gray-500">
                Hiển thị 1-{Math.min(10, filteredCategories.length)} trong số{" "}
                {filteredCategories.length} danh mục
            </div>

            <div className="flex items-center gap-2">
                <button
                    disabled
                    className={clsx(
                        "p-2 rounded-lg border border-gray-200 bg-white text-gray-400 cursor-not-allowed"
                    )}
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    disabled={filteredCategories.length <= 10}
                    className={clsx(
                        "p-2 rounded-lg border border-gray-200 bg-white text-gray-700 transition-colors",
                        filteredCategories.length <= 10 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-50"
                    )}
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    )
}
