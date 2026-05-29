import LoadingHotelAmenities from "../../ui/loading/LoadingHotelDatas"

import DBHotelAmenitiesHeader from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesHeader"
import DBHotelAmenitiesCategoryBar from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesCategoryBar"
import DBHotelAmenitiesTable from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesTable"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"

import {
    useAdminHotelAmenityCategories
} from "../../../../hooks/dashboard/admin/hotel-hooks/services/useAdminHotelAmenityCategories"

import {
    usePartnerHotelAmenities,
    useAvailableAmenities
} from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"

import { getAmenityIcon } from "../components/dashboard-main/dashboard-hotel-amenities/helpers/getAmenityIcon"
import { useSearchAmenityCategories } from "../../../../hooks/dashboard/partner/search-hooks/others/useSearchAmenityCategories"
import { useSearchAmenities } from "../../../../hooks/dashboard/partner/search-hooks/others/useSearchAmenities"
import { useHotelAmenitiesCRUDMutation } from "../../../../hooks/dashboard/partner/search-hooks/others/useHotelAmenitiesCRUDMutation"
import { useAnalyzeSelectedAmenities } from "../../../../hooks/dashboard/partner/search-hooks/others/useAnalyzeSelectedAmenities"


export default function DashboardHotelAmenities() {
    const { data: amenityCategories, isPending: isLoadingAmenityCategories } = useAdminHotelAmenityCategories()
    const { data: availableAmenities, isPending: isLoadingAvailableAmenities } = useAvailableAmenities()
    const { data: selectedHotelAmenities, isPending: isLoadingCurrentHotelAmenities } = usePartnerHotelAmenities()

    const {
        filteredAmenityCategories,
        categorySearchTerm,
        setCategorySearchTerm,
        activeAmenityCategoryID, 
        setActiveAmenityCategoryID
    } = useSearchAmenityCategories(amenityCategories)
    const { amenitiesSearchTerm, setAmenitiesSearchTerm } = useSearchAmenities()

    const { selectedAmenitiesMap, amenityCategoryStats, activeAmenities } = useAnalyzeSelectedAmenities(
        selectedHotelAmenities,
        amenityCategories,
        availableAmenities,
        activeAmenityCategoryID,
        amenitiesSearchTerm
    )

    const { handleToggleAmenityMutation, mutatingAmenityID } = useHotelAmenitiesCRUDMutation(selectedAmenitiesMap)


    if (isLoadingAmenityCategories || isLoadingAvailableAmenities || isLoadingCurrentHotelAmenities) {
        return <LoadingHotelAmenities labelLoading="Đang tải thông tin tiện nghi khách sạn..." />
    }

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelAmenitiesHeader
                categorySearchTerm={categorySearchTerm}
                setCategorySearchTerm={setCategorySearchTerm}
                amenitiesSearchTerm={amenitiesSearchTerm}
                setAmenitiesSearchTerm={setAmenitiesSearchTerm}
            />

            <DBHotelAmenitiesCategoryBar
                filteredAmenityCategories={filteredAmenityCategories}
                categorySearchTerm={categorySearchTerm}
                activeAmenityCategoryID={activeAmenityCategoryID}
                setActiveAmenityCategoryID={setActiveAmenityCategoryID}
                amenityCategoryStats={amenityCategoryStats}
                getAmenityIcon={getAmenityIcon}
            />

            <DBHotelAmenitiesTable
                activeAmenities={activeAmenities}
                amenitiesSearchTerm={amenitiesSearchTerm}
                selectedAmenitiesMap={selectedAmenitiesMap}
                mutatingAmenityID={mutatingAmenityID}
                handleToggleAmenityMutation={handleToggleAmenityMutation}
                getAmenityIcon={getAmenityIcon}
            />
        </div>
    )
}
