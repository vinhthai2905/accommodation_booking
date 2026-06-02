import LoadingHotelImages from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingHotelImages from "../../ui/loading/ErrorLoadingHotelDatas"

import DBHotelImageHeader from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageHeader"
import DBHotelImageGrid from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageGrid"
import DBHotelImageToolBar from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageToolBar"

import EditHotelImageModal from "../components/dashboard-main/dashboard-hotel-images/modal/EditHotelImageModal"
import DeleteHotelImageModal from "../components/dashboard-main/dashboard-hotel-images/modal/DeleteHotelImageModal"
import UploadHotelImageModal from "../components/dashboard-main/dashboard-hotel-images/modal/UploadHotelImageModal"

import { clsx } from "clsx"
import { useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

import usePartnerHotel from "../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotel"
import { 
    useEditHotelImage, 
    useDeleteHotelImage, 
    useCreateHotelImage 
} from "../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelImageMutations"

export default function DashboardHotelImages() {
    const { data: hotel, isPending, isError, error } = usePartnerHotel()
    const { mutate: editImage, isPending: isEditing } = useEditHotelImage()
    const { mutate: deleteImage, isPending: isDeleting } = useDeleteHotelImage()
    const { mutate: uploadImage, isPending: isUploading } = useCreateHotelImage()

    const [searchTerm, setSearchTerm] = useState("")

    // Modal states
    const [selectedImage, setSelectedImage] = useState(null)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
    
    const [editForm, setEditForm] = useState({ image_name: "" })
    const [uploadForm, setUploadForm] = useState({ image_name: "", is_primary: false, url: "" })

    if (isPending)
        return <LoadingHotelImages labelLoading={"Đang tải danh sách hình ảnh..."} />

    if (isError)
        return (
            <ErrorLoadingHotelImages
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách hình ảnh. Vui lòng thử lại sau."}
            />
        )

    const images = hotel?.hotel_images || []
    
    const filteredImages = images
        .filter(image => (image.image_name || "").toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            // Sort: is_primary true comes first
            if (a.is_primary === b.is_primary) return 0
            return a.is_primary ? -1 : 1
        })

    const handleSearchChange = (e) => setSearchTerm(e.target.value)
    // eslint-disable-next-line no-unused-vars
    const handleFilterChange = (type) => {
        // Implement filter logic if needed
    }

    // Handlers
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

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelImageHeader setIsUploadModalOpen={setIsUploadModalOpen} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBHotelImageToolBar 
                    searchTerms={searchTerm} 
                    handleSearchChange={handleSearchChange} 
                    handleFilterChange={handleFilterChange} 
                />
                
                <div className="flex-1 overflow-auto bg-gray-50/30">
                    <DBHotelImageGrid 
                        images={filteredImages} 
                        onSetPrimary={handleSetPrimary}
                        onEdit={handleOpenEditModal}
                        onDelete={handleOpenDeleteModal}
                    />
                </div>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <EditHotelImageModal
                        setIsEditModalOpen={setIsEditModalOpen}
                        handleSaveImageEdit={handleSaveImageEdit}
                        editForm={editForm}
                        setEditForm={setEditForm}
                        isPending={isEditing}
                    />
                )}
                {isDeleteModalOpen && selectedImage && (
                    <DeleteHotelImageModal
                        image={selectedImage}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteImage={handleConfirmDelete}
                        isPending={isDeleting}
                    />
                )}
                {isUploadModalOpen && (
                    <UploadHotelImageModal
                        setIsUploadModalOpen={handleCloseUploadModal}
                        handleSaveNewImage={handleSaveNewImage}
                        uploadForm={uploadForm}
                        setUploadForm={setUploadForm}
                        isPending={isUploading}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}
