import { useState } from "react"

import useClickOutside from "../common/useClickOutside"

export default function useLocationInput() {
    const [isLocationOpened, setIsLocationOpened] = useState(false)
    const { ref: placeRef } = useClickOutside(setIsLocationOpened)
    const [selectedPlace, setSelectedPlace] = useState("")
    const [isPlaceSelected, setIsPlacedSelected] = useState(false)
    const [showLocationError, setShowLocationError] = useState(false)

    return {
        isLocationOpened,
        setIsLocationOpened,
        isPlaceSelected,
        setIsPlacedSelected,
        selectedPlace,
        setSelectedPlace,
        placeRef,
        showLocationError,
        setShowLocationError,
    }
}