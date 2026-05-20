import { clsx } from "clsx"
import { AlertTriangle } from "lucide-react"

export default function DeleteCategoryAmenityModal({
    amenity,
    setIsDeleteModalOpen,
    handleDeleteAmenity,
}) {
    return (
        <div
            className={clsx(
                "fixed inset-0 z-100 flex items-center justify-center p-4",
                "bg-black/40 backdrop-blur-sm",
                "text-left transition-all"
            )}>

            <div
                className={clsx(
                    "w-full max-w-md overflow-hidden p-6",
                    "rounded-2xl border border-gray-100 bg-white shadow-2xl",
                    "transform transition-all duration-200",
                    "animate-in fade-in zoom-in-95"
                )}>

                <div className="flex flex-col items-center text-center">
                    <div
                        className={clsx(
                            "mb-4 flex h-14 w-14 items-center justify-center",
                            "rounded-full bg-rose-50 text-rose-600",
                            "ring-8 ring-rose-50/50"
                        )}>

                        <AlertTriangle size={28} />
                    </div>

                    <h3 className="mb-2 text-lg font-bold text-gray-900">
                        Xóa tiện nghi này?
                    </h3>

                    <p className="mb-6 text-sm leading-relaxed text-gray-500">
                        Bạn có chắc chắn muốn xóa tiện nghi{" "}
                        <strong className="font-semibold text-gray-900">
                            {amenity.amenity_name}
                        </strong>
                        ? Thao tác này không thể hoàn tác và tiện nghi sẽ bị gỡ khỏi hệ thống.
                    </p>

                    <div className="flex w-full items-center justify-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsDeleteModalOpen(false)}
                            className={clsx(
                                "rounded-xl flex-1 py-2.5",
                                "text-sm font-semibold text-gray-700",
                                "cursor-pointer transition-colors",
                                "hover:bg-gray-100"
                            )}>
                            Hủy
                        </button>

                        <button
                            type="button"
                            onClick={handleDeleteAmenity}
                            className={clsx(
                                "rounded-xl flex-1 py-2.5",
                                "bg-rose-600 text-white",
                                "text-sm font-semibold",
                                "shadow-md shadow-rose-500/20",
                                "cursor-pointer transition-all",
                                "hover:bg-rose-700 active:scale-[0.98]"
                            )}>

                            Xóa tiện nghi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
