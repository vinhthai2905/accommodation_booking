import LoadingHotelDatas from "@/features/partner/ui/dashboard-main/common/LoadingHotelDatas"

import { clsx } from "clsx"
import { Search, X } from "lucide-react"
import { useState } from "react"

import { useAvailableAmenityTypes } from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"
import { useCreatePartnerHotelAmenity } from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations"

export default function AddHotelAmenityModal({ setIsAddModalOpen, id_amenity_category }) {
    const { data: availableTypes, isPending: isLoadingTypes } = useAvailableAmenityTypes()
    const { mutate: createAmenity, isPending: isCreating } = useCreatePartnerHotelAmenity()
    
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedTypeId, setSelectedTypeId] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!selectedTypeId) return
        
        createAmenity({ id_amenity_type: selectedTypeId }, {
            onSuccess: () => setIsAddModalOpen(false)
        })
    }

    const filteredTypes = (availableTypes || [])
        .filter(type => !id_amenity_category || type.id_amenity_category === Number(id_amenity_category))
        .filter(type => 
            (type.name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (type.category_name || "").toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-lg overflow-hidden bg-white rounded-2xl shadow-xl flex flex-col max-h-[90vh]"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Thêm tiện nghi mới</h2>
                        <p className="text-sm text-gray-500">Chọn tiện nghi bạn muốn thêm vào khách sạn.</p>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm tiện nghi..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-4 space-y-2">
                    {isLoadingTypes ? (
                        <div className="py-12">
                            <LoadingHotelDatas labelLoading={"Đang tải danh sách tiện nghi khả dụng..."} />
                        </div>
                    ) : filteredTypes.length === 0 ? (
                        <div className="py-12 text-center text-gray-500">
                            Không tìm thấy tiện nghi nào khả dụng.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-2">
                            {filteredTypes.map((type) => (
                                <button
                                    key={type.id_amenity_type}
                                    type="button"
                                    onClick={() => setSelectedTypeId(type.id_amenity_type)}
                                    className={clsx(
                                        "flex items-center justify-between p-4 rounded-xl border transition-all text-left group",
                                        selectedTypeId === type.id_amenity_type
                                            ? "border-blue-500 bg-blue-50 shadow-sm"
                                            : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                                    )}
                                >
                                    <div>
                                        <div className={clsx(
                                            "font-semibold",
                                            selectedTypeId === type.id_amenity_type ? "text-blue-700" : "text-gray-900"
                                        )}>
                                            {type.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Danh mục: {type.category_name}
                                        </div>
                                    </div>
                                    {selectedTypeId === type.id_amenity_type && (
                                        <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex gap-3">
                    <button
                        type="button"
                        onClick={() => setIsAddModalOpen(false)}
                        className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer"
                    >
                        Hủy
                    </button>
                    <button
                        disabled={isCreating || !selectedTypeId}
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCreating ? "Đang xử lý..." : "Thêm tiện nghi"}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
