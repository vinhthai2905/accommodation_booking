import LoadingHotelTypes from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingHotelTypes from "../../ui/loading/ErrorLoadingHotelDatas"

import DBListHeader from "../../ui/dashboard-main/list-page/DBListHeader"
import DBHotelTypesPagination from "../components/dashboard-admin-main/dashboard-hotel-types/list-page/section/DBHotelTypesPagination"
import DBHotelTypesTable from "../components/dashboard-admin-main/dashboard-hotel-types/list-page/section/DBHotelTypesTable"
import DBHotelTypesToolBar from "../components/dashboard-admin-main/dashboard-hotel-types/list-page/section/DBHotelTypesToolBar"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { useState } from "react"

import { useAdminHotelTypes } from "../../../../hooks/dashboard/admin/hotel-types-hooks/useAdminHotelTypes"

export default function DashboardHotelTypes() {
    const { data: hotelTypes, isPending, isError, error } = useAdminHotelTypes()
    const [searchTerm, setSearchTerm] = useState("")

    if (isPending)
        return <LoadingHotelTypes labelLoading={"Đang tải danh sách loại khách sạn..."} />

    if (isError)
        return (
            <ErrorLoadingHotelTypes
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách loại khách sạn. Vui lòng thử lại sau."}
            />
        )

    const filteredHotelTypes = (hotelTypes || [])
        .filter(type =>
            (type.name || "").toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBListHeader
                listLabel={"Danh sách Loại Khách Sạn"}
                instructionLabel={"Quản lý danh sách các loại khách sạn hiện có tại đây."}
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "overflow-hidden",
                    "rounded-xl border border-gray-200 bg-white shadow-sm"
                )}
            >
                <DBHotelTypesToolBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                <div className="flex-1 overflow-auto min-h-80 bg-gray-50/30">
                    <DBHotelTypesTable
                        filteredHotelTypes={filteredHotelTypes}
                    />
                </div>

                <DBHotelTypesPagination
                    filteredHotelTypes={filteredHotelTypes}
                />
            </motion.div>
        </div>
    )
}
