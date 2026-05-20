import ErrorLoadingHotelDatas from "../../partner/ui/dashboard-main/common/ErrorLoadingHotelDatas"
import LoadingHotelDatas from "../../partner/ui/dashboard-main/common/LoadingHotelDatas"

import DBCategoryRow from "../components/dashboard-main/dashboard-category-amenities/list-page/row/DBCategoryRow"
import DBCategoryToolBar from "../components/dashboard-main/dashboard-category-amenities/list-page/section/DBCategoryToolBar"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Hash, Tag } from "lucide-react"
import { useState } from "react"

import { usePartnerHotelAmenityCategories } from "../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"

export default function DashboardCategoryAmenities() {
    const { data: categories, isPending, isError, error } = usePartnerHotelAmenityCategories()
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    if (isPending)
        return <LoadingHotelDatas labelLoading={"Đang tải danh sách danh mục tiện nghi..."} />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách danh mục. Vui lòng thử lại sau."}
            />
        )

    const filteredCategories = (categories || []).filter(category => 
        (category.name || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Pagination logic
    const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage)

    const handlePrevPage = () => {
        setCurrentPage(prev => Math.max(prev - 1, 1))
    }

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(prev + 1, totalPages))
    }

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Danh mục tiện nghi</h1>
                    <p className="text-gray-500 text-sm mt-1">Quản lý các nhóm/danh mục tiện nghi cho phòng và khách sạn của bạn.</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBCategoryToolBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                />
                
                {/* Table */}
                <div className="flex-1 overflow-auto min-h-[320px] bg-gray-50/30">
                    <table className="w-full border-collapse text-left text-sm text-gray-500">
                        <thead className="bg-gray-50/80 text-xs font-semibold uppercase tracking-wider text-gray-600 border-b border-gray-200/80">
                            <tr>
                                <th className="p-4 font-bold text-gray-700">
                                    <div className="flex items-center gap-1.5">
                                        <Hash size={14} className="text-gray-400" />
                                        ID
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-gray-700">
                                    <div className="flex items-center gap-1.5">
                                        <Tag size={14} className="text-gray-400" />
                                        Tên danh mục
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-gray-700">
                                    <div className="flex items-center gap-1.5">
                                        <Tag size={14} className="text-gray-400" />
                                        Slug
                                    </div>
                                </th>
                                <th className="p-4 font-bold text-gray-700 text-center w-32">
                                    <div className="flex justify-center items-center gap-1.5">
                                        Hành động
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {paginatedCategories.length > 0 ? (
                                paginatedCategories.map(category => (
                                    <DBCategoryRow 
                                        key={category.id_amenity_category} 
                                        category={category} 
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">
                                        Không tìm thấy danh mục nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-6 py-4">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trước
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sau
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Hiển thị <span className="font-medium">{startIndex + 1}</span> đến{" "}
                                    <span className="font-medium">
                                        {Math.min(startIndex + itemsPerPage, filteredCategories.length)}
                                    </span>{" "}
                                    trong tổng số <span className="font-medium">{filteredCategories.length}</span> danh mục
                                </p>
                            </div>
                            <div>
                                <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                        Trang {currentPage} / {totalPages}
                                    </span>
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    )
}
