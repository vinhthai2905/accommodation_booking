import { useState } from "react"

import useClickOutside from "../../../common/useClickOutside"

export default function useRoomTypeModal() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    
    const { ref: menuRef } = useClickOutside(setIsMenuOpen)
    
    return {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    }
}