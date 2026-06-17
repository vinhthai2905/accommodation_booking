import { clsx } from "clsx"
import { ChevronLeft } from "lucide-react"

export default function HotelsSearchPreviousPageButton({ onPageChange, currentPage }) {
    return (
        <button
            onClick={onPageChange}
            disabled={currentPage === 1}
            className={clsx(
                "flex items-center gap-1 px-3 py-1.5",
                "rounded border border-gray-300 bg-white",
                "transition-colors hover:bg-gray-50",
                "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
        >
            <ChevronLeft size={14} />
            <span>Trước</span>
        </button>
    )
}