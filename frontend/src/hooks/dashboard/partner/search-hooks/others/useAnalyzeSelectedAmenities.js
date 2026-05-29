import { useMemo } from "react"

export function useAnalyzeSelectedAmenities(
    selectedHotelAmenities, 
    amenityCategories, 
    availableAmenities, 
    activeAmenityCategoryID, 
    amenitiesSearchTerm
) {
    // Construct a quick-lookup map of hotel's current amenities: amenity_type_id -> hotel_amenity_id
    const selectedAmenitiesMap = useMemo(() => {
        if (!selectedHotelAmenities) return new Map()
        return new Map(selectedHotelAmenities.map(item => [item.id_amenity_type, item.id_hotel_amenity]))
    }, [selectedHotelAmenities])


    // Calculate selected vs total count for each category
    const amenityCategoryStats = useMemo(() => {
        if (!amenityCategories || !availableAmenities) return {}

        const categoryStats = {}

        amenityCategories.forEach(category => {
            const typesInCat = availableAmenities.filter(t => t.id_amenity_category === category.id_amenity_category)
            const selectedInCat = typesInCat.filter(t => selectedAmenitiesMap.has(t.id_amenity_type))
            categoryStats[category.id_amenity_category] = {
                totalAmenities: typesInCat.length,
                hotelSelectedAmenities: selectedInCat.length
            }
        })
        return categoryStats
    }, [amenityCategories, availableAmenities, selectedAmenitiesMap])

    // Filter available amenities belonging to the selected category & matching search term
    const activeAmenities = useMemo(() => {
        if (!availableAmenities || !activeAmenityCategoryID) return []
        let list = availableAmenities.filter(t => t.id_amenity_category === Number(activeAmenityCategoryID))
        if (amenitiesSearchTerm.trim() !== "") {
            list = list.filter(t =>
                t.name.toLowerCase().includes(amenitiesSearchTerm.toLowerCase())
            )
        }
        return list
    }, [availableAmenities, activeAmenityCategoryID, amenitiesSearchTerm])

    console.log(amenityCategoryStats)

    return {
        selectedAmenitiesMap,
        amenityCategoryStats,
        activeAmenities
    }
}