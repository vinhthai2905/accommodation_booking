import { HelpCircle } from "lucide-react"

export default function DBHotelAmenitiesCategoryBar({
    motion,
    filteredCategories,
    categorySearchTerm,
    activeCategoryId,
    setActiveCategoryId,
    categoryStats,
    getAmenityIcon 
}) {
    return (
        <div className="w-full overflow-hidden">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Danh mục tiện nghi</h3>
            {filteredCategories.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
                    <HelpCircle size={32} className="text-gray-300 mb-2" />
                    <span className="text-sm font-semibold text-gray-500">
                        Không tìm thấy danh mục tiện nghi nào khớp với "{categorySearchTerm}"
                    </span>
                </div>
            ) : (
                <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {filteredCategories.map((cat) => {
                        const isActive = activeCategoryId === cat.id_amenity_category
                        const stats = categoryStats[cat.id_amenity_category] || { selected: 0, total: 0 }
                        const IconComponent = getAmenityIcon(cat.slug, cat.name)

                        return (
                            <button
                                key={cat.id_amenity_category}
                                onClick={() => setActiveCategoryId(cat.id_amenity_category)}
                                className={`flex items-center gap-3 px-5 py-3 rounded-xl font-bold text-sm whitespace-nowrap cursor-pointer transition-all duration-300 relative border ${isActive
                                    ? "bg-[#003b95] text-white border-[#003b95] shadow-md shadow-blue-900/10"
                                    : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                                    }`}
                            >
                                <IconComponent size={18} className={isActive ? "text-white" : "text-gray-500"} />
                                <span>{cat.name}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {stats.selected}/{stats.total}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabUnderline"
                                        className="absolute -bottom-1 left-4 right-4 h-1 bg-blue-600 rounded-full"
                                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
