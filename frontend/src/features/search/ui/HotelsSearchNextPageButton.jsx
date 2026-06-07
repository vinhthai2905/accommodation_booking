import { clsx } from "clsx"
import { ChevronRight } from "lucide-react"

export default function HotelsSearchNextPageButton({ onPageChange, currentPage, totalPages }) {
    return (
        <button
            onClick={onPageChange}
            disabled={currentPage === totalPages}
            className={clsx(
                "flex items-center gap-1 px-3 py-1.5",
                "rounded border border-gray-300 bg-white",
                "transition-colors hover:bg-gray-50",
                "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
        >
            <span>Tiếp theo</span>
            <ChevronRight size={14} />
        </button>
    )
}