import LoadingHotelDatas from "../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import DBHotelCategoryAmenitiesHeader from "../components/dashboard-main/dashboard-hotel-category-amenities/list-page/section/DBHotelCategoryAmenitiesHeader"
import HotelAmenityTableRow from "../components/dashboard-main/dashboard-hotel-category-amenities/list-page/row/DBHotelCategoryAmenitiesRow"

import { clsx } from "clsx"
import { useState } from "react"
import { motion } from "framer-motion"
import { useParams, useNavigate } from "react-router"
import { Search, Plus, Tag, Hash, Shield, ChevronLeft, ChevronRight } from "lucide-react"

import { usePartnerHotelAmenitiesByCategory, usePartnerHotelCategoryDetail } from "../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"

export default function DashboardHotelCategoryAmenities() {
    const { id_amenity_category } = useParams()
    const navigate = useNavigate()
    const { data: amenities, isPending, isError, error } = usePartnerHotelAmenitiesByCategory(id_amenity_category)
    const { data: category } = usePartnerHotelCategoryDetail(id_amenity_category)
    
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    if (isPending)
        return <LoadingHotelDatas labelLoading={"Đang tải danh sách tiện nghi..."} />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách tiện nghi. Vui lòng thử lại sau."}
            />
        )

    const filteredAmenities = (amenities || []).filter(amenity => 
        (amenity.amenity_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination logic
    const totalPages = Math.ceil(filteredAmenities.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedAmenities = filteredAmenities.slice(startIndex, startIndex + itemsPerPage)

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelCategoryAmenitiesHeader motion={motion} categoryName={category?.name} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                {/* Search & Actions Toolbar */}
                <div
                    className={clsx(
                        "flex flex-col items-center justify-between gap-4 p-4",
                        "border-b border-gray-200",
                        "md:flex-row"
                    )}
                >
                    <div className="relative w-full md:w-80">
                        <div
                            className={clsx(
                                "pointer-events-none absolute inset-y-0 left-0",
                                "flex items-center pl-3"
                            )}
                        >
                            <Search size={18} className="text-gray-400" />
                        </div>

                        <input
                            type="text"
                            placeholder="Tìm kiếm tiện nghi..."
                            className={clsx(
                                "w-full rounded-lg px-4 py-2.5 pl-10 outline-none",
                                "border border-gray-300 bg-white",
                                "text-sm text-gray-900",
                                "transition-colors",
                                "focus:border-blue-500 focus:ring-blue-500"
                            )}
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value)
                                setCurrentPage(1)
                            }}
                        />
                    </div>

                    <div className="flex w-full items-center gap-3 md:w-auto">
                        <button
                            onClick={() => navigate(`/partner/dashboard/hotel/amenities/new?id_amenity_category=${id_amenity_category}`)}
                            className={clsx(
                                "flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white transition-all cursor-pointer md:w-auto shadow-md",
                                "bg-blue-600 hover:bg-blue-700 active:scale-[0.98] shadow-blue-500/10"
                            )}
                        >
                            <Plus size={16} />
                            Thêm tiện nghi mới
                        </button>
                    </div>
                </div>
                
                {/* Table */}
                <div className="flex-1 overflow-auto min-h-[320px] bg-gray-50/30">
                    <table className="w-full border-collapse text-left text-sm text-gray-500">
                        <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200/80">
                            <tr>
                                <th className="p-4 w-12 text-center whitespace-nowrap">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                </th>
                                <th className="p-4 font-bold text-gray-700 w-28 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5">
                                        <Hash size={14} className="text-gray-400" />
                                        ID tiện nghi
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-gray-700 w-[320px] whitespace-nowrap">
                                    <div className="flex items-center gap-1.5">
                                        <Tag size={14} className="text-gray-400" />
                                        Tên tiện nghi
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-gray-700 w-40 whitespace-nowrap">
                                    <div className="flex items-center gap-1.5">
                                        <Shield size={14} className="text-gray-400" />
                                        Phạm vi tiện nghi
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-gray-700 text-center w-28 whitespace-nowrap">
                                    <div className="flex justify-center items-center gap-1.5">
                                        Thao tác
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody className="text-sm divide-y divide-gray-100 bg-white">
                            {paginatedAmenities.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center text-gray-500 font-medium">
                                        Không có tiện nghi nào phù hợp với yêu cầu tìm kiếm.
                                    </td>
                                </tr>
                            ) : (
                                paginatedAmenities.map((amenity) => (
                                    <HotelAmenityTableRow key={amenity.id_hotel_amenity} initialAmenity={amenity} />
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div
                        className={clsx(
                            "flex flex-col items-center justify-between gap-4 p-4 border-t border-gray-200 bg-white",
                            "text-[13px] text-gray-500",
                            "sm:flex-row"
                        )}
                    >
                        <div>
                            Hiển thị {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAmenities.length)} trong số {filteredAmenities.length} tiện nghi
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className={clsx(
                                    "flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                )}
                            >
                                <ChevronLeft size={14} />
                                <span>Trước</span>
                            </button>

                            <button
                                className={clsx(
                                    "flex h-8 w-8 items-center justify-center rounded border border-blue-600 bg-blue-50 font-medium text-blue-600"
                                )}
                            >
                                {currentPage}
                            </button>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className={clsx(
                                    "flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 bg-white transition-colors hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                                )}
                            >
                                <span>Sau</span>
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
