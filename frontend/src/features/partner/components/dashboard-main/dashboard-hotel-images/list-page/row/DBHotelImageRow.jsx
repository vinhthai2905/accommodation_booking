import DBHotelImageRowDatas from "./DBHotelImageRowDatas"
import DBHotelImageRowActions from "./DBHotelImageRowActions"
import DBRoomActionsButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"

import { useState, useRef, useEffect } from "react"

export default function DBHotelImageRow({ initialImage }) {
    const [image, setImage] = useState(initialImage)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const menuRef = useRef(null)

    // Handle clicking outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSetPrimary = () => {
        // Implement setting as primary logic
        setImage(prev => ({ ...prev, is_primary: true }))
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <DBHotelImageRowDatas image={image} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBHotelImageRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsEditModalOpen={setIsEditModalOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleSetPrimary={handleSetPrimary}
                    />
                )}

                {/* Modals would go here */}
            </td>
        </tr>
    )
}
