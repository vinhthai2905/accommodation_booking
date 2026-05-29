import { useState } from "react"
import useClickOutside from "../../../../common/useClickOutside"

export default function useAdminAmenityCategoryModals() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    
    const { ref: menuRef } = useClickOutside(setIsMenuOpen)
    
    return {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
    }
}
