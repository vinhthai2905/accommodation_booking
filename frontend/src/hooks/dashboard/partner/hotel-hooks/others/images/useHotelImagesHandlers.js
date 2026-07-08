export default function useHotelImagesHandlers({
    images,
    editImage,
    deleteImage,
    uploadImage,
    isUploading,
    selectedImage,
    setSelectedImage,
    setEditForm,
    setIsEditModalOpen,
    setIsDeleteModalOpen,
    setIsUploadModalOpen,
    editForm,
    uploadForm,
    setUploadForm
}) {
    const handleSetPrimary = (imageId) => {
        editImage({
            id_hotel_image: imageId,
            payload: { is_primary: true }
        })
    }

    const handleOpenEditModal = (imageId) => {
        const img = images.find(i => i.id_hotel_image === imageId)
        if (img) {
            setSelectedImage(img)
            setEditForm({ image_name: img.image_name })
            setIsEditModalOpen(true)
        }
    }

    const handleOpenDeleteModal = (imageId) => {
        const img = images.find(i => i.id_hotel_image === imageId)
        if (img) {
            setSelectedImage(img)
            setIsDeleteModalOpen(true)
        }
    }

    const handleSaveImageEdit = (e) => {
        e.preventDefault()
        if (!selectedImage) return
        
        editImage({
            id_hotel_image: selectedImage.id_hotel_image,
            payload: { image_name: editForm.image_name }
        }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleConfirmDelete = () => {
        if (!selectedImage) return
        
        deleteImage(selectedImage.id_hotel_image, {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    const handleSaveNewImage = (e) => {
        e.preventDefault()
        if (!uploadForm.url) return
        
        const payload = {
            url: uploadForm.url,
            image_name: uploadForm.image_name,
            is_primary: uploadForm.is_primary
        }
        
        uploadImage(payload, {
            onSuccess: () => {
                setIsUploadModalOpen(false)
                setUploadForm({ image_name: "", is_primary: false, url: "" })
            }
        })
    }

    const handleCloseUploadModal = () => {
        if (!isUploading) {
            setIsUploadModalOpen(false)
            setUploadForm({ image_name: "", is_primary: false, url: "" })
        }
    }

    return {
        handleSetPrimary,
        handleOpenEditModal,
        handleOpenDeleteModal,
        handleSaveImageEdit,
        handleConfirmDelete,
        handleSaveNewImage,
        handleCloseUploadModal
    }
}
