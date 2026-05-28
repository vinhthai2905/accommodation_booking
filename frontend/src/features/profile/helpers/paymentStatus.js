import { CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react"

export const paymentStatus = {
    PENDING_PAYMENT: {
        label: "Chờ thanh toán",
        color: "bg-amber-100 text-amber-700",
        icon: Clock,
    },
    PAID: {
        label: "Đã thanh toán",
        color: "bg-emerald-100 text-emerald-700",
        icon: CheckCircle2,
    },
    PENDING_REFUND: {
        label: "Chờ hoàn tiền",
        color: "bg-indigo-100 text-indigo-700",
        icon: AlertCircle,
    },
    REFUNDED: {
        label: "Đã hoàn tiền",
        color: "bg-purple-100 text-purple-700",
        icon: CheckCircle2,
    },
    FAILED: {
        label: "Thất bại",
        color: "bg-red-100 text-red-600",
        icon: XCircle,
    },
}
