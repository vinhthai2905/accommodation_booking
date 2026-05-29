import { clsx } from "clsx"

export default function DBRoomTypeFormInputLabel({ children }) {
    return (
        <label className={clsx(
            "mb-1.5 flex items-center gap-1.5",
            "text-xs font-semibold uppercase tracking-wider",
            "text-gray-600"
        )}>
            {children}
        </label>
    )
}