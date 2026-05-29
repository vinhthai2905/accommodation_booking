import LoadingUsers from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingUsers from "../../ui/loading/ErrorLoadingHotelDatas"

import DBListHeader from "../../ui/dashboard-main/list-page/DBListHeader"
import DBUsersPagination from "../components/dashboard-admin-main/dashboard-users/list-page/section/DBUsersPagination"
import DBUsersTable from "../components/dashboard-admin-main/dashboard-users/list-page/section/DBUsersTable"
import DBUsersToolBar from "../components/dashboard-admin-main/dashboard-users/list-page/section/DBUsersToolBar"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { useState } from "react"

import { useAdminUsers } from "../../../../hooks/dashboard/admin/user-hooks/services/useAdminUsers"
import { useAdminRoles } from "../../../../hooks/dashboard/admin/user-hooks/services/useAdminRoles"

export default function DashboardUsers() {
    const { data: users, isPending, isError, error } = useAdminUsers()
    const { data: roles } = useAdminRoles()
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedRoleId, setSelectedRoleId] = useState("all")

    if (isPending)
        return <LoadingUsers labelLoading={"Đang tải danh sách người dùng..."} />

    if (isError)
        return (
            <ErrorLoadingUsers
                errorMessage={error?.message}
                alterMessageError={"Không thể tải danh sách người dùng. Vui lòng thử lại sau."}
            />
        )

    const filteredUsers = (users || [])
        .filter(user =>
            selectedRoleId === "all" ||
            String(user.current_role?.id_role) === String(selectedRoleId)
        )
        .filter(user =>
            (user.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.first_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.last_name || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (user.phone_number || "").toLowerCase().includes(searchTerm.toLowerCase())
        )

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBListHeader
                listLabel={"Danh sách Người dùng"}
                instructionLabel={"Quản lý tất cả người dùng trong hệ thống tại đây."}
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
                <DBUsersToolBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    roles={roles}
                    selectedRoleId={selectedRoleId}
                    setSelectedRoleId={setSelectedRoleId}
                />

                <div className="flex-1 overflow-auto min-h-80 bg-gray-50/30">
                    <DBUsersTable
                        filteredUsers={filteredUsers}
                    />
                </div>

                <DBUsersPagination
                    filteredUsers={filteredUsers}
                />
            </motion.div>
        </div>
    )
}
