import { AnimatePresence } from "framer-motion"
import { Loader2, Check, HelpCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function DBHotelAmenitiesTable({ 
    activeAmenities, 
    amenitySearchTerm, 
    selectedAmenitiesMap, 
    mutatingAmenityID, 
    handleToggleAmenityMutation,
    getAmenityIcon
}) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Danh sách tiện nghi của danh mục</h3>
                <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2.5 py-1 rounded-lg">
                    Tổng cộng: {activeAmenities.length} tiện ích
                </span>
            </div>

            {activeAmenities.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-gray-200 border-dashed text-center">
                    <HelpCircle size={48} className="text-gray-300 mb-3" />
                    <h4 className="font-bold text-gray-700 text-lg">
                        {amenitySearchTerm ? "Không tìm thấy tiện ích" : "Danh mục trống"}
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                        {amenitySearchTerm
                            ? `Không tìm thấy tiện ích nào khớp với từ khóa "${amenitySearchTerm}" trong danh mục này.`
                            : "Chưa có loại tiện nghi nào được thiết lập cho danh mục này."}
                    </p>
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {activeAmenities.map((amenity) => {
                            const isChecked = selectedAmenitiesMap.has(amenity.id_amenity_type)
                            const isMutating = mutatingAmenityID.has(amenity.id_amenity_type)
                            const IconComponent = getAmenityIcon(amenity.slug, amenity.name)

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    key={amenity.id_amenity_type}
                                    onClick={() => handleToggleAmenityMutation(amenity)}
                                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 ${isChecked
                                        ? "border-blue-200 bg-blue-50/40 hover:bg-blue-50/70"
                                        : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                                        }`}
                                >
                                    <div className="flex items-center gap-3.5 min-w-0">
                                        <div className={`p-3 rounded-xl transition-colors shrink-0 ${isChecked ? "bg-blue-100/70 text-[#003b95]" : "bg-gray-50 text-gray-500"
                                            }`}>
                                            <IconComponent size={22} />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-gray-900 text-sm truncate">{amenity.name}</h4>
                                            <span className="text-[10px] uppercase font-extrabold tracking-wider text-gray-400 mt-0.5 block">
                                                {amenity.scope === "room" ? "Trong phòng" : "Công cộng"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center shrink-0 ml-4">
                                        <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all duration-200 ${isMutating
                                            ? "border-blue-500 bg-transparent"
                                            : isChecked
                                                ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                                                : "border-gray-300 bg-white"
                                            }`}>
                                            {isMutating ? (
                                                <Loader2 size={14} className="animate-spin text-blue-600" />
                                            ) : isChecked ? (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                                >
                                                    <Check size={14} strokeWidth={3} />
                                                </motion.div>
                                            ) : null}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}
