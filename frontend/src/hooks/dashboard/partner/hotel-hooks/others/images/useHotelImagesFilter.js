import { useState, useMemo } from "react"

export default function useHotelImagesFilter(images = []) {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredImages = useMemo(() => {
        return images
            .filter(image => (image.image_name || "").toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => {
                // Sort: is_primary true comes first
                if (a.is_primary === b.is_primary) return 0
                return a.is_primary ? -1 : 1
            })
    }, [images, searchTerm])

    const handleSearchChange = (e) => setSearchTerm(e.target.value)

    const handleFilterChange = (type) => {
        // Implement filter logic if needed
    }

    return {
        searchTerm,
        filteredImages,
        handleSearchChange,
        handleFilterChange
    }
}
