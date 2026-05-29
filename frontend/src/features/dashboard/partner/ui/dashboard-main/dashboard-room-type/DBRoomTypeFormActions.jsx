import { clsx } from "clsx"
import { Loader2, Save } from "lucide-react"

export default function DBRoomTypeFormActions({ isPending = false, onCancel }) {
    return (
        <div
            className={clsx(
                "mt-6 flex items-center justify-end gap-3 pt-4",
                "border-t border-gray-100"
            )}
        >
            <button
                type="button"
                onClick={onCancel}
                disabled={isPending}
                className={clsx(
                    "rounded-xl px-4 py-2",
                    "text-sm font-semibold text-gray-600",
                    "transition-colors",
                    "cursor-pointer",
                    "hover:bg-gray-100",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
            >
                Hủy
            </button>

            <button
                type="submit"
                disabled={isPending}
                className={clsx(
                    "flex items-center gap-2 rounded-xl px-5 py-2",
                    "bg-blue-600 text-white",
                    "text-sm font-semibold",
                    "shadow-md shadow-blue-500/20",
                    "transition-all",
                    "cursor-pointer",
                    "hover:bg-blue-700 active:scale-[0.98]",
                    "disabled:opacity-60 disabled:cursor-not-allowed"
                )}
            >
                {isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                <span>Lưu thay đổi</span>
            </button>
        </div>
    )
}