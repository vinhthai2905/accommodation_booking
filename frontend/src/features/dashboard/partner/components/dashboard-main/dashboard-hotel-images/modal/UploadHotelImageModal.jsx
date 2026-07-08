import { clsx } from "clsx"
import { Upload, Save, X, ImageIcon } from "lucide-react"
import ModalActionButtons from "../ui/ModalActionButtons"

export default function UploadHotelImageModal({
    setIsUploadModalOpen,
    handleSaveNewImage,
    uploadForm,
    setUploadForm,
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
                        <div
                            className={clsx(
                                "rounded-xl p-2",
                                "bg-blue-50 text-blue-600"
                            )}
                        >
                            <Upload size={18} />
                        </div>

                        <h3 className="text-base font-bold text-gray-900">
                            Thêm hình ảnh mới
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => !isPending && setIsUploadModalOpen(false)}
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
                <form onSubmit={handleSaveNewImage} className="space-y-4 p-6">
                    <div>
                        <label className={clsx(
                            "mb-1.5 block",
                            "text-xs font-semibold uppercase tracking-wider",
                            "text-gray-600"
                        )}>
                            Đường dẫn hình ảnh (URL) *
                        </label>

                        <div className="relative">
                            <input
                                type="url"
                                required
                                placeholder="Nhập link hình ảnh (VD: https://...)"
                                className={clsx(
                                    "w-full rounded-xl px-4 py-2.5 outline-none",
                                    "border border-gray-200",
                                    "text-sm font-medium text-gray-900",
                                    "transition-all",
                                    "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                                    isPending && "bg-gray-50 text-gray-500"
                                )}
                                value={uploadForm.url || ""}
                                onChange={(e) => setUploadForm({ ...uploadForm, url: e.target.value })}
                                disabled={isPending}
                            />
                        </div>
                    </div>

                    {/* Image Preview */}
                    {uploadForm.url && (
                        <div className="mt-4 flex justify-center">
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                                <img
                                    src={uploadForm.url}
                                    alt="Preview"
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        e.target.src = "https://via.placeholder.com/400x300?text=Invalid+Image+URL"
                                    }}
                                />
                            </div>
                        </div>
                    )}

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
                                className={clsx(
                                    "w-full rounded-xl px-4 py-2.5 outline-none",
                                    "border border-gray-200",
                                    "text-sm font-medium text-gray-900",
                                    "transition-all",
                                    "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                                    isPending && "bg-gray-50 text-gray-500"
                                )}
                                value={uploadForm.image_name || ""}
                                onChange={(e) =>
                                    setUploadForm({
                                        ...uploadForm,
                                        image_name: e.target.value,
                                    })
                                }
                                disabled={isPending}
                                placeholder="Nhập tên hiển thị (tùy chọn)"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="is_primary"
                            checked={uploadForm.is_primary || false}
                            onChange={(e) =>
                                setUploadForm({
                                    ...uploadForm,
                                    is_primary: e.target.checked
                                })
                            }
                            disabled={isPending}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <label htmlFor="is_primary" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Đặt làm ảnh chính
                        </label>
                    </div>

                    {/* Footer */}
                    <div className={clsx(
                        "mt-6 flex items-center justify-end gap-3 pt-4",
                        "border-t border-gray-100"
                    )}>
                        <ModalActionButtons setModal={setIsUploadModalOpen} isPending={isPending} />
                    </div>
                </form>
            </div>
        </div>
    )
}
