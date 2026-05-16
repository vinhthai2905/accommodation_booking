import LoadingHotelDatas from "../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import DBHotelImageHeader from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageHeader"
import DBHotelImageGrid from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageGrid"
import DBHotelImageToolBar from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageToolBar"

import { clsx } from "clsx"
import { useState } from "react"
import { motion } from "framer-motion"

import usePartnerHotel from "../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotel"

export default function DashboardHotelImages() {
    const { data: hotel, isPending, isError, error } = usePartnerHotel()
    const [searchTerm, setSearchTerm] = useState("")

    if (isPending)
        return <LoadingHotelDatas labelLoading={"Đang tải danh sách hình ảnh..."} />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách hình ảnh. Vui lòng thử lại sau."}
            />
        )

    const images = hotel?.hotel_images || []
    
    const filteredImages = images.filter(image =>
        (image.image_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleSearchChange = (e) => setSearchTerm(e.target.value)
    const handleFilterChange = (type) => {
        // Implement filter logic if needed
    }

    // Dummy handlers for grid actions, to be wired to Modals / Mutations later
    const handleSetPrimary = (imageId) => {
        console.log("Set primary", imageId)
    }

    const handleEditImage = (imageId) => {
        console.log("Edit image", imageId)
    }

    const handleDeleteImage = (imageId) => {
        console.log("Delete image", imageId)
    }

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelImageHeader />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBHotelImageToolBar 
                    searchTerms={searchTerm} 
                    handleSearchChange={handleSearchChange} 
                    handleFilterChange={handleFilterChange} 
                />
                
                <div className="flex-1 overflow-auto bg-gray-50/30">
                    <DBHotelImageGrid 
                        images={filteredImages} 
                        onSetPrimary={handleSetPrimary}
                        onEdit={handleEditImage}
                        onDelete={handleDeleteImage}
                    />
                </div>
            </motion.div>
        </div>
    )
}
