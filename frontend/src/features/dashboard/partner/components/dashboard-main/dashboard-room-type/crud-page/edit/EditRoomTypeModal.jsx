import DBEditRoomTypeForm from "../components/DBEditRoomTypeForm"

import { clsx } from "clsx"
import { Coins, Layers, Pencil, Save, Users, X } from "lucide-react"

export default function EditRoomTypeModal({
    setIsEditModalOpen,
    handleSaveRoomTypeEdit,
    editForm,
    setEditForm,
}) {
    return (
        <div
            className={clsx(
                "fixed inset-0 z-100 flex items-center justify-center p-4",
                "bg-black/40 backdrop-blur-sm",
                "text-left transition-all"
            )}
        >
            <div
                className={clsx(
                    "w-full max-w-lg overflow-hidden",
                    "rounded-2xl border border-gray-100 bg-white shadow-2xl",
                    "transform transition-all duration-200",
                    "animate-in fade-in zoom-in-95"
                )}
            >
                {/* Header */}
                <div
                    className={clsx(
                        "flex items-center justify-between px-6 py-4",
                        "border-b border-gray-100",
                        "bg-linear-to-r from-gray-50/50 to-white"
                    )}
                >
                    <div className="flex items-center gap-2.5">
                        <div
                            className={clsx(
                                "rounded-xl p-2",
                                "bg-blue-50 text-blue-600"
                            )}
                        >
                            <Pencil size={18} />
                        </div>

                        <h3 className="text-base font-bold text-gray-900">
                            Chỉnh sửa loại phòng
                        </h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className={clsx(
                            "rounded-lg p-1.5",
                            "text-gray-400",
                            "transition-colors",
                            "cursor-pointer",
                            "hover:bg-gray-100 hover:text-gray-600"
                        )}
                    >
                        <X size={18} />
                    </button>
                </div>

                <DBEditRoomTypeForm
                    handleSaveRoomTypeEdit={handleSaveRoomTypeEdit}
                    editForm={editForm}
                    setEditForm={setEditForm}
                />
            </div>
        </div>
    )
}