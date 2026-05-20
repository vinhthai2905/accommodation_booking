import { useState } from "react"

export function useSearchAmenities() {
    const [amenitiesSearchTerm, setAmenitiesSearchTerm] = useState("")
    
    return {
        amenitiesSearchTerm,
        setAmenitiesSearchTerm
    }
}