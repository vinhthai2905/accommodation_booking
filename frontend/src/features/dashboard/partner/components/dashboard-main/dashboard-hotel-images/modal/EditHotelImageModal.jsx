import { clsx } from "clsx"
import { Pencil, Save, X } from "lucide-react"
import ModalActionButtons from "../ui/ModalActionButtons"

export default function EditHotelImageModal({
    setIsEditModalOpen,
    handleSaveImageEdit,
    editForm,
    setEditForm,
    isPending
}) {
    return (
        <div className={clsx(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            "bg-black/40 backdrop-blur-sm",
            "text-left transition-all"
        )}>
            <div className={clsx(
                "w-full max-w-md overflow-hidden",
                "rounded-2xl border border-gray-100 bg-white shadow-2xl",
                "transform transition-all duration-200",
                "animate-in fade-in zoom-in-95"
            )}>
                {/* Header */}
                <div className={clsx(
                    "flex items-center justify-between px-6 py-4",
                    "border-b border-gray-100",
                    "bg-linear-to-r from-gray-50/50 to-white"
                )}>
                    <div className="flex items-center gap-2.5">
                        <div className={clsx(
                            "rounded-xl p-2",
                            "bg-blue-50 text-blue-600"
                        )}>
                            <Pencil size={18} />
                        </div>

                        <h3 className="text-base font-bold text-gray-900">
                            Chỉnh sửa tên hình ảnh
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => !isPending && setIsEditModalOpen(false)}
                        className={clsx(
                            "rounded-lg p-1.5",
                            "text-gray-400",
                            "transition-colors",
                            "cursor-pointer",
                            "hover:bg-gray-100 hover:text-gray-600",
                            isPending && "opacity-50 cursor-not-allowed"
                        )}
                        disabled={isPending}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSaveImageEdit} className="space-y-4 p-6">
                    <div>
                        <label className={clsx(
                            "mb-1.5 block",
                            "text-xs font-semibold uppercase tracking-wider",
                            "text-gray-600"
                        )}>
                            Tên hình ảnh
                        </label>

                        <div className="relative">
                            <input
                                type="text"
                                required
                                className={clsx(
                                    "w-full rounded-xl px-4 py-2.5 outline-none",
                                    "border border-gray-200",
                                    "text-sm font-medium text-gray-900",
                                    "transition-all",
                                    "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                                    isPending && "bg-gray-50 text-gray-500"
                                )}
                                value={editForm.image_name || ""}
                                onChange={(e) =>
                                    setEditForm({
                                        ...editForm,
                                        image_name: e.target.value,
                                    })
                                }
                                disabled={isPending}
                                placeholder="Nhập tên hình ảnh..."
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={clsx(
                        "mt-6 flex items-center justify-end gap-3 pt-4",
                        "border-t border-gray-100"
                    )}>
                       <ModalActionButtons setModal={setIsEditModalOpen} isPending={isPending}/>
                    </div>
                </form>
            </div>
        </div>
    )
}
