import DBRoomTypeDetailHeader from "../components/dashboard-main/dashboard-room-type-detail/section/DBRoomTypeDetailHeader"
import DBRoomTypeDetailMain from "../components/dashboard-main/dashboard-room-type-detail/section/DBRoomTypeDetailMain"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { useParams } from "react-router"

export default function DashboardRoomTypeDetail() {
    const { id_room_type, slug } = useParams()

    // Derive a readable name from the slug (replace hyphens with spaces, title-case)
    const roomTypeName = slug
        ? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
        : null

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBRoomTypeDetailHeader
                motion={motion}
                roomTypeName={roomTypeName}
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
                <DBRoomTypeDetailMain id_room_type={Number(id_room_type)} />
            </motion.div>
        </div>
    )
}
