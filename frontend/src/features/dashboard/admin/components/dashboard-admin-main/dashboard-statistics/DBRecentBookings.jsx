import { clsx } from "clsx"
import { motion } from "framer-motion"
import { MoreHorizontal } from "lucide-react"

export default function DBRecentBookings() {
    const recentBookings = [
        { id: "BOK-001", user: "Nguyễn Văn An", hotel: "Khách sạn Mường Thanh", status: "Hoàn tất", amount: "8.500.000 VNĐ" },
        { id: "BOK-002", user: "Trần Thị Bích", hotel: "Vinpearl Resort Nha Trang", status: "Đang chờ", amount: "21.500.000 VNĐ" },
        { id: "BOK-003", user: "Lê Hoàng Châu", hotel: "Đà Lạt Palace Heritage", status: "Đã hủy", amount: "2.900.000 VNĐ" },
        { id: "BOK-004", user: "Phạm Đại Dương", hotel: "Khách sạn Majestic Sài Gòn", status: "Hoàn tất", amount: "10.800.000 VNĐ" },
        { id: "BOK-005", user: "Vũ Kim Ngân", hotel: "Pullman Vũng Tàu", status: "Hoàn tất", amount: "5.000.000 VNĐ" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={clsx("p-6 rounded-2xl bg-white border border-gray-200 shadow-sm")}
        >
            <div className={clsx("flex items-center justify-between mb-6")}>
                <h2 className={clsx("text-xl font-bold text-gray-900")}>Đặt phòng gần đây</h2>
                <button className={clsx(
                    "p-2 rounded-lg text-gray-400",
                    "hover:bg-gray-100 transition-colors"
                )}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            <div className={clsx("space-y-4")}>
                {recentBookings.map((booking, i) => (
                    <div key={i} className={clsx(
                        "flex items-center justify-between",
                        "p-3 rounded-xl hover:bg-gray-50",
                        "transition-colors"
                    )}>
                        <div>
                            <p className={clsx("font-medium text-gray-900")}>{booking.user}</p>
                            <p className={clsx("text-sm text-gray-500")}>{booking.hotel}</p>
                        </div>
                        <div className={clsx("text-right")}>
                            <p className={clsx("font-medium text-gray-900")}>{booking.amount}</p>
                            <span className={clsx(
                                "inline-block mt-1 px-2 py-1 rounded-md text-xs font-medium",
                                booking.status === 'Hoàn tất' && "bg-emerald-50 text-emerald-600",
                                booking.status === 'Đang chờ' && "bg-amber-50 text-amber-600",
                                booking.status === 'Đã hủy' && "bg-rose-50 text-rose-600"
                            )}>
                                {booking.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    )
}
