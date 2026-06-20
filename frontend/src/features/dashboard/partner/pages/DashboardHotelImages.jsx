import LoadingHotelImages from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingHotelImages from "../../ui/loading/ErrorLoadingHotelDatas"

import DBHotelImageHeader from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageHeader"
import DBHotelImageGrid from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageGrid"
import DBHotelImageToolBar from "../components/dashboard-main/dashboard-hotel-images/list-page/section/DBHotelImageToolBar"

import EditHotelImageModal from "../components/dashboard-main/dashboard-hotel-images/modal/EditHotelImageModal"
import DeleteHotelImageModal from "../components/dashboard-main/dashboard-hotel-images/modal/DeleteHotelImageModal"
import UploadHotelImageModal from "../components/dashboard-main/dashboard-hotel-images/modal/UploadHotelImageModal"

import { clsx } from "clsx"
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion"

import useDashboardHotelImages from "../../../../hooks/dashboard/partner/hotel-hooks/others/images/useDashboardHotelImages"

export default function DashboardHotelImages() {
    const {
        status,
        headerProps,
        toolBarProps,
        gridProps,
        editModalProps,
        deleteModalProps,
        uploadModalProps
    } = useDashboardHotelImages()

    if (status.isPending)
        return <LoadingHotelImages labelLoading={"Đang tải danh sách hình ảnh..."} />

    if (status.isError)
        return (
            <ErrorLoadingHotelImages
                errorMessage={status.error?.message}
                alterMessageError={"Không thể tải danh sách hình ảnh. Vui lòng thử lại sau."}
            />
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelImageHeader {...headerProps} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBHotelImageToolBar {...toolBarProps} />
                
                <div className="flex-1 overflow-auto bg-gray-50/30">
                    <DBHotelImageGrid {...gridProps} />
                </div>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {editModalProps.isEditModalOpen && (
                    <EditHotelImageModal {...editModalProps} />
                )}
                {deleteModalProps.isDeleteModalOpen && deleteModalProps.image && (
                    <DeleteHotelImageModal {...deleteModalProps} />
                )}
                {uploadModalProps.isUploadModalOpen && (
                    <UploadHotelImageModal {...uploadModalProps} />
                )}
            </AnimatePresence>
        </div>
    )
}
