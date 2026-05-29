import { useEffect, useRef, useState } from "react"

export default function usePartnerBookingModals() {
    const menuRef = useRef(null)

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isCancelModalOpen,
        setIsCancelModalOpen,
        isConfirmModalOpen,
        setIsConfirmModalOpen,
    }
}