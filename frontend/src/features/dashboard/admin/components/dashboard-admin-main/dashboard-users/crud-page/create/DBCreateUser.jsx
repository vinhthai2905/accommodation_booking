import LoadingCreateUser from "../../../../../../ui/loading/LoadingHotelDatas"

import { clsx } from "clsx"
import { useState } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { ArrowLeft, User } from "lucide-react"

import { useAdminRoles } from "../../../../../../../../hooks/dashboard/admin/user-hooks/services/useAdminRoles"
import { useCreateAdminUser } from "../../../../../../../../hooks/dashboard/admin/user-hooks/services/useAdminUserMutations"

export default function DBCreateUser() {
    const navigate = useNavigate()

    const { data: roles, isPending: isLoadingRoles } = useAdminRoles()
    const { mutate: createUser, isPending: isCreating } = useCreateAdminUser()

    const [form, setForm] = useState({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        role_name: "Khách hàng",
        is_active: true
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.email || !form.password) return

        const payload = {
            email: form.email,
            password: form.password,
            is_active: form.is_active,
            role_name: form.role_name,
            personal_info: {
                first_name: form.first_name,
                last_name: form.last_name,
                phone_number: form.phone_number
            }
        }

        createUser(payload, {
            onSuccess: () => {
                navigate("/admin/users")
            }
        })
    }

    if (isLoadingRoles) {
        return <LoadingCreateUser labelLoading="Đang tải dữ liệu vai trò..." />
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
                    <h1 className="mb-1 text-3xl font-bold text-gray-900">Thêm người dùng mới</h1>
                    <p className="text-gray-500 text-sm">Điền thông tin bên dưới để tạo và cấp quyền cho người dùng mới.</p>
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
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <User size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Thông tin tài khoản</h2>
                        <p className="text-sm text-gray-500 mt-1">Vui lòng cung cấp đầy đủ thông tin bắt buộc.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-1.5">
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

                        <div className="space-y-1.5">
                            <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Mật khẩu</label>
                            <input
                                required
                                type="password"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                                placeholder="••••••••"
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
                            disabled={isCreating}
                            type="submit"
                            className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating ? "Đang lưu..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
