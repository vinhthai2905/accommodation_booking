import LoadingWards from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingWards from "../../ui/loading/ErrorLoadingHotelDatas"

import DBListHeader from "../../ui/dashboard-main/list-page/DBListHeader"
import DBWardsPagination from "../components/dashboard-admin-main/dashboard-ward/list-page/section/DBWardsPagination"
import DBWardsTable from "../components/dashboard-admin-main/dashboard-ward/list-page/section/DBWardsTable"
import DBWardsToolBar from "../components/dashboard-admin-main/dashboard-ward/list-page/section/DBWardsToolBar"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { useState } from "react"

import { useAdminWards } from "../../../../hooks/dashboard/admin/location-hooks/services/useAdminWards"
import { useAdminCities } from "../../../../hooks/dashboard/admin/location-hooks/services/useAdminCities"

export default function DashboardWards() {
    const { data: wards, isPending, isError, error } = useAdminWards()
    const { data: cities } = useAdminCities()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCityId, setSelectedCityId] = useState("all")

    if (isPending)
        return <LoadingWards labelLoading={"Đang tải danh sách phường..."} />

    if (isError)
        return (
            <ErrorLoadingWards
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách phường. Vui lòng thử lại sau."}
            />
        )

    const filteredWards = (wards || [])
        .filter(ward =>
            selectedCityId === "all" ||
            String(ward.id_city) === String(selectedCityId)
        )
        .filter(ward =>
            (ward.ward_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (ward.city_name || "").toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBListHeader
                listLabel={"Danh sách Phường"}
                instructionLabel={"Quản lý danh sách các Phường hiện có tại đây."}
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
                <DBWardsToolBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    cities={cities}
                    selectedCityId={selectedCityId}
                    setSelectedCityId={setSelectedCityId}
                />

                <div className="flex-1 overflow-auto min-h-80 bg-gray-50/30">
                    <DBWardsTable
                        filteredWards={filteredWards}
                    />
                </div>

                <DBWardsPagination
                    filteredWards={filteredWards}
                />
            </motion.div>
        </div>
    )
}
