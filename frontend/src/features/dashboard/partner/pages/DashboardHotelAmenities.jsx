import LoadingHotelAmenities from "../../ui/loading/LoadingHotelDatas"

import DBHotelAmenitiesHeader from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesHeader"
import DBHotelAmenitiesCategoryBar from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesCategoryBar"
import DBHotelAmenitiesTable from "../components/dashboard-main/dashboard-hotel-amenities/list-page/section/DBHotelAmenitiesTable"

import { useState, useEffect, useMemo } from "react"
import { motion } from "framer-motion"

import {
    usePartnerHotelAmenities,
    usePartnerHotelAmenityCategories,
    useAvailableAmenityTypes
} from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenities"

import {
    useCreatePartnerHotelAmenity,
    useDeletePartnerHotelAmenity
} from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations"

import { getAmenityIcon } from "../components/dashboard-main/dashboard-hotel-amenities/helpers/getAmenityIcon"


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
            <DBHotelAmenitiesHeader 
                motion={motion}
                categorySearchTerm={categorySearchTerm}
                setCategorySearchTerm={setCategorySearchTerm}
                amenitySearchTerm={amenitySearchTerm}
                setAmenitySearchTerm={setAmenitySearchTerm}
            />

            <DBHotelAmenitiesCategoryBar 
                motion={motion}
                filteredCategories={filteredCategories}
                categorySearchTerm={categorySearchTerm}
                activeCategoryId={activeCategoryId}
                setActiveCategoryId={setActiveCategoryId}
                categoryStats={categoryStats}
                getAmenityIcon={getAmenityIcon}
            />
          
            <DBHotelAmenitiesTable 
                motion={motion}
                activeAmenities={activeAmenities}
                amenitySearchTerm={amenitySearchTerm}
                currentAmenitiesMap={currentAmenitiesMap}
                mutatingIds={mutatingIds}
                handleToggleAmenity={handleToggleAmenity}
                getAmenityIcon={getAmenityIcon}
            />
        </div>
    )
}
