import { useState } from "react"

export default function useHotelImageModals() {
    // Modal visibility states
    const [selectedImage, setSelectedImage] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    
    // Form states
    const [editForm, setEditForm] = useState({ image_name: "" })
    const [uploadForm, setUploadForm] = useState({ image_name: "", is_primary: false, url: "" })

    return {
        selectedImage,
        setSelectedImage,
        isEditModalOpen,
        setIsEditModalOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        editForm,
        setEditForm,
        uploadForm,
        setUploadForm
    }
}
