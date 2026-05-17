import { clsx } from "clsx"
import { MoreHorizontal } from "lucide-react"

export default function DBHotelCategoryActionsButton({ isMenuOpen, setIsMenuOpen }) {
    return (
        <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={clsx(
                "p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 cursor-pointer",
                isMenuOpen && "bg-gray-100 text-gray-900 ring-2 ring-gray-200/60 shadow-inner"
            )}
            title="Tùy chọn khác"
        >
            <MoreHorizontal size={18} />
        </button>
    )
}
