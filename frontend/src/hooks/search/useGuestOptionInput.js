import { useState } from "react"
import useClickOutside from "../useClickOutside"

export default function useGuestOptionInput() {
    const [isGuestOpened, setIsGuestOpened] = useState(false)
    const { ref: guestRef } = useClickOutside(setIsGuestOpened)
    const [guestOptions, setGuestOptions] = useState({
        rooms: 1,
        adults: 1,
        children: 0,
        childrenAge: []
    })

    const [showAgeError, setShowAgeError] = useState(false)

    return {
        isGuestOpened,
        setIsGuestOpened,
        guestOptions,
        setGuestOptions,
        guestRef,
        showAgeError,
        setShowAgeError
    }
}