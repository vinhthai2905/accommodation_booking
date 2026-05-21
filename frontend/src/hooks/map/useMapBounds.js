import { useState, useCallback } from "react"

export function useMapBounds() {
    const [mapBounds, setMapBounds] = useState(null)

    const handleMapViewPortChange = useCallback(params => {
        setMapBounds(params)
    }, [])

    return {
        mapBounds, setMapBounds, handleMapViewPortChange
    }
}