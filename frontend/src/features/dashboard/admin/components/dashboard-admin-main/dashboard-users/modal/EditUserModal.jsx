import { clsx } from "clsx"
import { Pencil, Save, X } from "lucide-react"

export default function EditUserModal({
    setIsEditModalOpen,
    handleSaveUserEdit,
    editForm,
    setEditForm,
    roles
}) {
    return (
        <div className={clsx(
            "fixed inset-0 z-100 flex items-center justify-center p-4",
            "bg-black/40 backdrop-blur-sm transition-all"
        )}>
            <div className={clsx(
                "w-full max-w-lg overflow-hidden",
                "rounded-2xl border border-gray-100 bg-white shadow-2xl",
                "transform transition-all duration-200",
                "animate-in fade-in zoom-in-95"
            )}>
                <div className={clsx(
                    "flex items-center justify-between px-6 py-4",
                    "border-b border-gray-100 bg-linear-to-r from-gray-50/50 to-white"
                )}>
                    <div className="flex items-center gap-2.5">
                        <div className="rounded-xl p-2 bg-blue-50 text-blue-600">
                            <Pencil size={18} />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">
                            Chỉnh sửa thông tin
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsEditModalOpen(false)}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form onSubmit={handleSaveUserEdit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full rounded-xl px-4 py-2.5 border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Họ</label>
                            <input
                                type="text"
                                className="w-full rounded-xl px-4 py-2.5 border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                value={editForm.first_name}
                                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Tên</label>
                            <input
                                type="text"
                                className="w-full rounded-xl px-4 py-2.5 border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                value={editForm.last_name}
                                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Số điện thoại</label>
                            <input
                                type="text"
                                className="w-full rounded-xl px-4 py-2.5 border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                                value={editForm.phone_number}
                                onChange={(e) => setEditForm({ ...editForm, phone_number: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600">Vai trò</label>
                            <select
                                className="w-full rounded-xl px-4 py-2.5 border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
                                value={editForm.role_name}
                                onChange={(e) => setEditForm({ ...editForm, role_name: e.target.value })}
                            >
                                {roles?.map(role => (
                                    <option key={role.id_role} value={role.role_name}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={editForm.is_active}
                                onChange={(e) => setEditForm({ ...editForm, is_active: e.target.checked })}
                                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Tài khoản đang hoạt động</span>
                        </label>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={() => setIsEditModalOpen(false)}
                            className="rounded-xl px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-xl px-5 py-2 bg-blue-600 text-white text-sm font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
                        >
                            <Save size={16} />
                            <span>Lưu thay đổi</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
