import DBRoomActionsButton from "../../../../../../partner/ui/dashboard-main/dashboard-room/DBRoomActionsButton"
import DBUsersRowActions from "./DBUsersRowActions"
import DBUsersRowDatas from "./DBUsersRowDatas"

import DeleteUserModal from "../../modal/DeleteUserModal"

import { useState } from "react"

import { useUpdateAdminUser, useDeleteAdminUser } from "../../../../../../../../hooks/dashboard/admin/user-hooks/services/useAdminUserMutations"
import usePartnerRoomModals from "../../../../../../../../hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomModals"
import { useAdminRoles } from "../../../../../../../../hooks/dashboard/admin/user-hooks/services/useAdminRoles"

export default function DBUserRow({ initialUser }) {
    const [user, setUser] = useState(initialUser)
    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
        isDeleteModalOpen,
        setIsDeleteModalOpen
    } = usePartnerRoomModals()
    const { mutate: deleteUser } = useDeleteAdminUser()

    const handleDeleteUser = () => {
        deleteUser(user.id_user, {
            onSuccess: () => setIsDeleteModalOpen(false)
        })
    }

    return (
        <tr className="hover:bg-gray-50/80 transition-colors group">
            <DBUsersRowDatas user={user} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBUsersRowActions
                        setIsMenuOpen={setIsMenuOpen}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        idUser={user.id_user}
                    />
                )}

                {isDeleteModalOpen && (
                    <DeleteUserModal
                        user={user}
                        setIsDeleteModalOpen={setIsDeleteModalOpen}
                        handleDeleteUser={handleDeleteUser}
                    />
                )}
            </td>
        </tr>
    )
}
