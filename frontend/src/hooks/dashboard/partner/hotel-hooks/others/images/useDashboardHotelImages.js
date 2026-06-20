import { 
    useEditHotelImage, 
    useDeleteHotelImage, 
    useCreateHotelImage 
} from "../../services/usePartnerHotelImageMutations"

import usePartnerHotel from "../../services/usePartnerHotel"
import useHotelImageModals from "./useHotelImageModals"
import useHotelImagesFilter from "./useHotelImagesFilter"
import useHotelImagesHandlers from "./useHotelImagesHandlers"

export default function useDashboardHotelImages() {
    const { data: hotel, isPending, isError, error } = usePartnerHotel()
    const { mutate: editImage, isPending: isEditing } = useEditHotelImage()
    const { mutate: deleteImage, isPending: isDeleting } = useDeleteHotelImage()
    const { mutate: uploadImage, isPending: isUploading } = useCreateHotelImage()

    const images = hotel?.hotel_images || []

    const {
        searchTerm,
        filteredImages,
        handleSearchChange,
        handleFilterChange
    } = useHotelImagesFilter(images)

    const {
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
    } = useHotelImageModals()

    const handlers = useHotelImagesHandlers({
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
    })

    return {
        status: {
            isPending,
            isError,
            error,
        },
        headerProps: {
            setIsUploadModalOpen
        },
        toolBarProps: {
            searchTerms: searchTerm,
            handleSearchChange,
            handleFilterChange
        },
        gridProps: {
            images: filteredImages,
            onSetPrimary: handlers.handleSetPrimary,
            onEdit: handlers.handleOpenEditModal,
            onDelete: handlers.handleOpenDeleteModal
        },
        editModalProps: {
            isEditModalOpen,
            setIsEditModalOpen,
            handleSaveImageEdit: handlers.handleSaveImageEdit,
            editForm,
            setEditForm,
            isPending: isEditing
        },
        deleteModalProps: {
            isDeleteModalOpen,
            image: selectedImage,
            setIsDeleteModalOpen,
            handleDeleteImage: handlers.handleConfirmDelete,
            isPending: isDeleting
        },
        uploadModalProps: {
            isUploadModalOpen,
            setIsUploadModalOpen: handlers.handleCloseUploadModal,
            handleSaveNewImage: handlers.handleSaveNewImage,
            uploadForm,
            setUploadForm,
            isPending: isUploading
        }
    }
}
