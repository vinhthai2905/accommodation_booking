import { ChevronLeft, ChevronRight } from "lucide-react"

export default function DBHotelImagePagination() {
    return (
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between bg-white mt-auto">
            <span className="text-sm text-gray-500">
                Hiển thị <span className="font-medium text-gray-900">1</span> đến <span className="font-medium text-gray-900">10</span> của <span className="font-medium text-gray-900">10</span> hình ảnh
            </span>
            <div className="flex items-center gap-2">
                <button
                    disabled
                    className="p-1 rounded-md text-gray-400 hover:bg-gray-100 disabled:opacity-50 cursor-not-allowed"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    className="px-3 py-1 rounded-md text-sm font-medium bg-[#003b95] text-white"
                >
                    1
                </button>
                <button
                    disabled
                    className="p-1 rounded-md text-gray-400 hover:bg-gray-100 disabled:opacity-50 cursor-not-allowed"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    )
}
