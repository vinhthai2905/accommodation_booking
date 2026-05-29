import { orderStatus } from "../../helpers/orderStatus"

import { clsx } from "clsx"
import { AlertCircle } from "lucide-react"

export default function StatusBadge({ status, statusMap = orderStatus }) {
    const meta = statusMap[status] ?? {
        label: status,
        color: "bg-gray-100 text-gray-600",
        icon: AlertCircle,
    }
    
    const Icon = meta.icon
    return (
        <span
            className={clsx(
                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
                meta.color
            )}
        >
            <Icon size={13} />
            {meta.label}
        </span>
    )
}