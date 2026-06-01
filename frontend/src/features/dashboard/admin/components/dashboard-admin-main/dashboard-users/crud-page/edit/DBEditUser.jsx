import LoadingEditUser from "../../../../../../ui/loading/LoadingHotelDatas"

import { clsx } from "clsx"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { motion } from "framer-motion"
import { ArrowLeft, User, Edit3 } from "lucide-react"

import { useAdminUsers } from "../../../../../../../../hooks/dashboard/admin/user-hooks/services/useAdminUsers"
import { useAdminRoles } from "../../../../../../../../hooks/dashboard/admin/user-hooks/services/useAdminRoles"
import { useUpdateAdminUser } from "../../../../../../../../hooks/dashboard/admin/user-hooks/services/useAdminUserMutations"

export default function DBEditUser() {
    const { id_user } = useParams()
    const navigate = useNavigate()

    const { data: users, isPending: isLoadingUsers } = useAdminUsers()
    const { data: roles, isPending: isLoadingRoles } = useAdminRoles()
    const { mutate: updateUser, isPending: isUpdating } = useUpdateAdminUser()

    const [form, setForm] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        role_name: "",
        is_active: true
    })

    useEffect(() => {
        if (users && users.length > 0) {
            const user = users.find(u => String(u.id_user) === String(id_user))
            if (user) {
                setForm({
                    email: user.email || "",
                    password: "", // Keep blank for edit
                    first_name: user.first_name || "",
                    last_name: user.last_name || "",
                    phone_number: user.phone_number || "",
                    role_name: user.current_role?.role_name || "Khách hàng",
                    is_active: user.is_active ?? true
                })
            } else {
                // Not found, could navigate back
                navigate("/admin/dashboard/users")
            }
        }
    }, [users, id_user, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.email) return

        const payload = {
            email: form.email,
            is_active: form.is_active,
            role_name: form.role_name,
            personal_info: {
                first_name: form.first_name,
                last_name: form.last_name,
                phone_number: form.phone_number
            }
        }

        // Only send password if it was filled out
        if (form.password.trim() !== "") {
            payload.password = form.password
        }

        updateUser({ id_user, payload }, {
            onSuccess: () => {
                navigate("/admin/dashboard/users")
            }
        })
    }

    if (isLoadingRoles || isLoadingUsers) {
        return <LoadingEditUser labelLoading="Đang tải dữ liệu người dùng..." />
    }

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4"
            >
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm mb-2 transition-colors cursor-pointer group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                        Quay lại danh sách
                    </button>
                    <h1 className="mb-1 text-3xl font-bold text-gray-900">Chỉnh sửa người dùng</h1>
                    <p className="text-gray-500 text-sm">Cập nhật thông tin chi tiết và quyền hạn của người dùng.</p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                )}
            >
                <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-gray-50/50 to-white flex items-center gap-3">
                    <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                        <Edit3 size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Thông tin tài khoản</h2>
                        <p className="text-sm text-gray-500 mt-1">Cập nhật đầy đủ các thông tin cần thiết.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Email</label>
                            <input
                                required
                                type="email"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                placeholder="nguyenvana@example.com"
                                value={form.email}
                                onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-1.5 md:col-span-2">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Mật khẩu mới (Tùy chọn)</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                placeholder="Bỏ trống nếu không muốn thay đổi"
                                value={form.password}
                                onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Họ</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                placeholder="Nguyễn Văn"
                                value={form.first_name}
                                onChange={(e) => setForm(prev => ({ ...prev, first_name: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Tên</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                placeholder="A"
                                value={form.last_name}
                                onChange={(e) => setForm(prev => ({ ...prev, last_name: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Số điện thoại</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                placeholder="0901234567"
                                value={form.phone_number}
                                onChange={(e) => setForm(prev => ({ ...prev, phone_number: e.target.value }))}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Vai trò</label>
                            <select
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-gray-700 bg-white"
                                value={form.role_name}
                                onChange={(e) => setForm(prev => ({ ...prev, role_name: e.target.value }))}
                            >
                                {roles?.map(role => (
                                    <option key={role.id_role} value={role.role_name}>
                                        {role.role_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <input
                            type="checkbox"
                            id="is_active"
                            checked={form.is_active}
                            onChange={(e) => setForm(prev => ({ ...prev, is_active: e.target.checked }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="is_active" className="text-sm font-medium text-gray-700 cursor-pointer">
                            Tài khoản đang hoạt động
                        </label>
                    </div>

                    <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-6 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer text-center"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={isUpdating}
                            type="submit"
                            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isUpdating ? "Đang lưu..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
