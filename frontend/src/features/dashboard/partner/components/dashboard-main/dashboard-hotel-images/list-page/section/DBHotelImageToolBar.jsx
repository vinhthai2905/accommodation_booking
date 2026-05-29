import { Search, Filter } from "lucide-react"

export default function DBHotelImageToolBar({ searchTerms, handleSearchChange, handleFilterChange }) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    value={searchTerms}
                    onChange={handleSearchChange}
                    placeholder="Tìm kiếm hình ảnh..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003b95]/20 focus:border-[#003b95] transition-all bg-white"
                />
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => handleFilterChange("all")}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                    <Filter size={18} />
                    <span>Lọc</span>
                </button>
            </div>
        </div>
    )
}
