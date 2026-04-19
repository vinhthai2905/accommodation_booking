import { useState } from "react"

import useClickOutside from "../useClickOutside"

export default function useLocationInput() {
    const [isLocationOpened, setIsLocationOpened] = useState(false)
    const { ref: placeRef } = useClickOutside(setIsLocationOpened)
    const [selectedPlace, setSelectedPlace] = useState("")

    return {
        isLocationOpened,
        setIsLocationOpened,
        selectedPlace,
        setSelectedPlace,
        placeRef
    }
}