import { AlertCircle, CheckCircle2, XCircle } from "lucide-react"

export const orderStatus = {
    PENDING: {
        label: "Chờ nhận phòng",
        color: "bg-amber-100 text-amber-700",
        icon: AlertCircle,
    },
    CONFIRMED: {
        label: "Đã nhận phòng",
        color: "bg-blue-100 text-blue-700",
        icon: CheckCircle2,
    },
    COMPLETED: {
        label: "Đã trả phòng",
        color: "bg-emerald-100 text-emerald-700",
        icon: CheckCircle2,
    },
    CANCELLED: {
        label: "Đã hủy",
        color: "bg-red-100 text-red-600",
        icon: XCircle,
    },
}

export const tabs = [
    { id: "upcoming", label: "Sắp tới" },
    { id: "past", label: "Đã qua" },
    { id: "cancelled", label: "Đã hủy" },
]