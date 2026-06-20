import { clsx } from "clsx"

export default function ModalActionButtons({ setModal, isPending }) {
    return (
        <>
            <button
                type="button"
                onClick={() => setModal(false)}
                className={clsx(
                    "rounded-xl px-4 py-2",
                    "text-sm font-semibold text-gray-600",
                    "transition-colors",
                    "cursor-pointer",
                    "hover:bg-gray-100",
                    isPending && "opacity-50 cursor-not-allowed"
                )}
                disabled={isPending}
            >
                Hủy
            </button>

            <button
                type="submit"
                className={clsx(
                    "flex items-center gap-2 rounded-xl px-5 py-2",
                    "bg-blue-600 text-white",
                    "text-sm font-semibold",
                    "shadow-md shadow-blue-500/20",
                    "transition-all",
                    "cursor-pointer",
                    "hover:bg-blue-700 active:scale-[0.98]",
                    isPending && "opacity-70 cursor-wait"
                )}
                disabled={isPending}
            >
                <Save size={16} />
                <span>{isPending ? "Đang lưu..." : "Thêm hình ảnh"}</span>
            </button>
        </>
    )
}