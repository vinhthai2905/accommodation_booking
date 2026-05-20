import LoadingHotelAmenities from "@/features/dashboard/partner/ui/dashboard-main/common/LoadingHotelDatas"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Loader2, Search, X, Sparkles, HelpCircle } from "lucide-react"

import { getAmenityIcon } from "../components/dashboard-main/dashboard-hotel-amenities/helpers/getAmenityIcon"

import {
    usePartnerHotelAmenities,
    usePartnerHotelAmenityCategories,
    useAvailableAmenityTypes
} from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"
import {
    useCreatePartnerHotelAmenity,
    useDeletePartnerHotelAmenity
} from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations"

export default function DashboardHotelAmenities() {
    const { data: categories, isPending: isLoadingCategories } = usePartnerHotelAmenityCategories()
    const { data: availableAmenityTypes, isPending: isLoadingAvailable } = useAvailableAmenityTypes()
    const { data: currentAmenities, isPending: isLoadingCurrent } = usePartnerHotelAmenities()

    const { mutate: addAmenity } = useCreatePartnerHotelAmenity()
    const { mutate: removeAmenity } = useDeletePartnerHotelAmenity()

    const [activeCategoryId, setActiveCategoryId] = useState(null)
    const [mutatingIds, setMutatingIds] = useState(new Set())
    const [categorySearchTerm, setCategorySearchTerm] = useState("")
    const [amenitySearchTerm, setAmenitySearchTerm] = useState("")

    // Filter categories based on categorySearchTerm
    const filteredCategories = useMemo(() => {
        if (!categories) return []
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
        )
    }, [categories, categorySearchTerm])

    // Select the first category by default or update it if currently active category is filtered out
    useEffect(() => {
        if (filteredCategories.length > 0) {
            const exists = filteredCategories.some(c => c.id_amenity_category === activeCategoryId)
            if (!exists) {
                setActiveCategoryId(filteredCategories[0].id_amenity_category)
            }
        } else {
            setActiveCategoryId(null)
        }
    }, [filteredCategories, activeCategoryId])

    // Construct a quick-lookup map of hotel's current amenities: amenity_type_id -> hotel_amenity_id
    const currentAmenitiesMap = useMemo(() => {
        if (!currentAmenities) return new Map()
        return new Map(currentAmenities.map(item => [item.id_amenity_type, item.id_hotel_amenity]))
    }, [currentAmenities])

    // Calculate selected vs total count for each category
    const categoryStats = useMemo(() => {
        if (!categories || !availableAmenityTypes) return {}
        const stats = {}
        categories.forEach(cat => {
            const typesInCat = availableAmenityTypes.filter(t => t.id_amenity_category === cat.id_amenity_category)
            const selectedInCat = typesInCat.filter(t => currentAmenitiesMap.has(t.id_amenity_type))
            stats[cat.id_amenity_category] = {
                total: typesInCat.length,
                selected: selectedInCat.length
            }
        })
        return stats
    }, [categories, availableAmenityTypes, currentAmenitiesMap])

    // Filter available amenities belonging to the selected category & matching search term
    const activeAmenities = useMemo(() => {
        if (!availableAmenityTypes || !activeCategoryId) return []
        let list = availableAmenityTypes.filter(t => t.id_amenity_category === Number(activeCategoryId))
        if (amenitySearchTerm.trim() !== "") {
            list = list.filter(t =>
                t.name.toLowerCase().includes(amenitySearchTerm.toLowerCase())
            )
        }
        return list
    }, [availableAmenityTypes, activeCategoryId, amenitySearchTerm])

    const handleToggleAmenity = (amenityType) => {
        const typeId = amenityType.id_amenity_type
        if (mutatingIds.has(typeId)) return // Prevent duplicate clicks during request

        // Add to local mutating state
        setMutatingIds(prev => {
            const next = new Set(prev)
            next.add(typeId)
            return next
        })

        const hotelAmenityId = currentAmenitiesMap.get(typeId)

        if (hotelAmenityId) {
            // If already exists, we remove it
            removeAmenity(hotelAmenityId, {
                onSuccess: () => {
                    setMutatingIds(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                },
                onError: () => {
                    setMutatingIds(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                }
            })
        } else {
            // Otherwise, we add it
            addAmenity({ id_amenity_type: typeId }, {
                onSuccess: () => {
                    setMutatingIds(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                },
                onError: () => {
                    setMutatingIds(prev => {
                        const next = new Set(prev)
                        next.delete(typeId)
                        return next
                    })
                }
            })
        }
    }

    if (isLoadingCategories || isLoadingAvailable || isLoadingCurrent) {
        return <LoadingHotelAmenities labelLoading="Đang tải thông tin tiện nghi khách sạn..." />
    }

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            {/* Header section with gradient */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-6 md:p-8 rounded-2xl bg-linear-to-r from-[#003b95] to-blue-700 text-white shadow-lg relative overflow-hidden"
            >
                <div className="absolute right-0 bottom-0 opacity-10 translate-x-10 translate-y-10">
                    <Sparkles size={260} />
                </div>
                <div className="relative z-10 max-w-2xl">
                    <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-blue-500/30 rounded-full text-blue-150 border border-blue-400/20">
                        Quản lý tiện ích
                    </span>
                    <h1 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight">Tiện nghi khách sạn</h1>
                    <p className="mt-2 text-blue-100 text-sm md:text-base font-medium">
                        Chọn các dịch vụ và tiện nghi có sẵn tại khách sạn của bạn. Dữ liệu sẽ tự động lưu và hiển thị trực tiếp trên trang chi tiết khách sạn để giúp thu hút nhiều khách hàng đặt phòng hơn.
                    </p>
                </div>
            </motion.div>

            {/* Search Toolbar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm"
            >
                {/* Search Categories */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm danh mục..."
                        className="w-full rounded-xl px-4 py-2.5 pl-10 pr-10 outline-none border border-gray-200 focus:border-[#003b95] focus:ring-2 focus:ring-blue-100 text-sm text-gray-900 transition-all duration-250 bg-gray-50/20"
                        value={categorySearchTerm}
                        onChange={(e) => setCategorySearchTerm(e.target.value)}
                    />
                    {categorySearchTerm && (
                        <button
                            onClick={() => setCategorySearchTerm("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                {/* Search Amenities */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm tiện ích..."
                        className="w-full rounded-xl px-4 py-2.5 pl-10 pr-10 outline-none border border-gray-200 focus:border-[#003b95] focus:ring-2 focus:ring-blue-100 text-sm text-gray-900 transition-all duration-250 bg-gray-50/20"
                        value={amenitySearchTerm}
                        onChange={(e) => setAmenitySearchTerm(e.target.value)}
                    />
                    {amenitySearchTerm && (
                        <button
                            onClick={() => setAmenitySearchTerm("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </motion.div>

            {/* Horizontal Category Tab Bar */}
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

            {/* Amenities Grid List */}
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
                                const isChecked = currentAmenitiesMap.has(amenity.id_amenity_type)
                                const isMutating = mutatingIds.has(amenity.id_amenity_type)
                                const IconComponent = getAmenityIcon(amenity.slug, amenity.name)

                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        key={amenity.id_amenity_type}
                                        onClick={() => handleToggleAmenity(amenity)}
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

                                        {/* Custom checkbox with loading/checked indicator */}
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
        </div>
    )
}
