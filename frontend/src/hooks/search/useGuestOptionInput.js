import { useState } from "react"
import useClickOutside from "../useClickOutside"

export default function useGuestOptionInput() {
    const [isGuestOpened, setIsGuestOpened] = useState(false)
    const { ref: guestRef } = useClickOutside(setIsGuestOpened)
    const [guestOptions, setGuestOptions] = useState({
        adults: 1,
        rooms: 1
    })

    return {
        isGuestOpened,
        setIsGuestOpened,
        guestOptions,
        setGuestOptions,
        guestRef
    }
}