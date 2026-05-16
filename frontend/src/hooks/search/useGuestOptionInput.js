import { useState } from "react"
import useClickOutside from "../common/useClickOutside"

export default function useGuestOptionInput() {
    const [isGuestOpened, setIsGuestOpened] = useState(false)
    const { ref: guestRef } = useClickOutside(setIsGuestOpened)
    const [guestOptions, setGuestOptions] = useState({
        rooms: 1,
        adults: 1,
        children: 0,
        childrenAge: []
    })

    const [isAgeInputError, setIsAgeInputError] = useState(false)

    return {
        isGuestOpened,
        setIsGuestOpened,
        guestOptions,
        setGuestOptions,
        guestRef,
        isAgeInputError,
        setIsAgeInputError
    }
}