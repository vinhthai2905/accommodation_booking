import { useState } from "react"

import DBBookingRowDatas from "./DBBookingRowDatas"
import DBBookingRowActions from "./DBBookingRowActions"

import DBRoomTypeActionsButton from "../../../../../ui/dashboard-main/dashboard-room-type/DBRoomTypeActionsButton"
import usePartnerRoomTypeModals from "/src/hooks/dashboard/partner/room-type-hooks/modals/usePartnerRoomTypeModals"

export default function DBBookingRow({ initialBooking }) {
    const [booking, setBooking] = useState(initialBooking)

    const {
        menuRef,
        isMenuOpen,
        setIsMenuOpen,
    } = usePartnerRoomTypeModals()

    return (
        <tr className="text-center hover:bg-gray-50/80 transition-colors group">
            <DBBookingRowDatas booking={booking} />

            <td className="p-4 text-center relative" ref={menuRef}>
                <DBRoomTypeActionsButton
                    isMenuOpen={isMenuOpen}
                    setIsMenuOpen={setIsMenuOpen}
                />

                {isMenuOpen && (
                    <DBBookingRowActions
                        booking={booking}
                        setIsMenuOpen={setIsMenuOpen}
                    />
                )}
            </td>
        </tr>
    )
}