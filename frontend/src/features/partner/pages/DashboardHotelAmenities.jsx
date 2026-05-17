import LoadingHotelDatas from "../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import DBHotelAmenitiesHeader from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesHeader"
import DBHotelAmenitiesTable from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesTable"
import DBHotelAmenitiesToolBar from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesToolBar"
import DBHotelAmenitiesPagination from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesPagination"

import { clsx } from "clsx"
import { useState } from "react"
import { motion } from "framer-motion"

import { usePartnerHotelAmenities, usePartnerHotelAmenityCategories } from "../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"

export default function DashboardHotelAmenities() {
    const { data: amenities, isPending, isError, error } = usePartnerHotelAmenities()
    const { data: categories } = usePartnerHotelAmenityCategories()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategoryId, setSelectedCategoryId] = useState("all")

    if (isPending)
        return <LoadingHotelDatas labelLoading={"Đang tải danh sách tiện nghi..."} />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách tiện nghi. Vui lòng thử lại sau."}
            />
        )

    const filteredAmenities = (amenities || [])
        .filter(amenity => 
            selectedCategoryId === "all" || 
            String(amenity.id_amenity_category) === String(selectedCategoryId)
        )
        .filter(amenity => 
            (amenity.amenity_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (amenity.category_name || "").toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelAmenitiesHeader motion={motion} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBHotelAmenitiesToolBar 
                    searchTerm={searchTerm} 
                    setSearchTerm={setSearchTerm} 
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    setSelectedCategoryId={setSelectedCategoryId}
                />
                
                <div className="flex-1 overflow-auto min-h-[320px] bg-gray-50/30">
                    <DBHotelAmenitiesTable 
                        filteredAmenities={filteredAmenities} 
                    />
                </div>

                <DBHotelAmenitiesPagination 
                    filteredAmenities={filteredAmenities}
                />
            </motion.div>
        </div>
    )
}
