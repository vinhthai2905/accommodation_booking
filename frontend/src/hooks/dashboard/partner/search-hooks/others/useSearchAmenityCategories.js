import { useMemo } from "react"
import { useEffect, useState } from "react"

export function useSearchAmenityCategories(amenityCategories) {
    const [activeAmenityCategoryID, setActiveAmenityCategoryID] = useState(null)
    const [categorySearchTerm, setCategorySearchTerm] = useState("")

    const filteredAmenityCategories = useMemo(() => {
        if (!amenityCategories) return []

        return amenityCategories.filter(cat =>
            cat.name.toLowerCase().includes(categorySearchTerm.toLowerCase())
        )
    }, [amenityCategories, categorySearchTerm])

    useEffect(() => {
        if (filteredAmenityCategories.length > 0) {
            const exists = filteredAmenityCategories.some(category => category.id_amenity_category === activeAmenityCategoryID)
            if (!exists) {
                setActiveAmenityCategoryID(filteredAmenityCategories[0].id_amenity_category)
            }
        } else {
            setActiveAmenityCategoryID(null)
        }
    }, [filteredAmenityCategories, activeAmenityCategoryID, setActiveAmenityCategoryID])

    return {
        categorySearchTerm,
        setCategorySearchTerm,
        filteredAmenityCategories,
        activeAmenityCategoryID,
        setActiveAmenityCategoryID
    }
}

