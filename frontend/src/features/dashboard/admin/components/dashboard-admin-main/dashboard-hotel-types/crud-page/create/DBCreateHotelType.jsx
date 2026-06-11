import LoadingCreateHotelType from "../../../../../../ui/loading/LoadingHotelDatas"

import { clsx } from "clsx"
import { useState } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { ArrowLeft, Building2 } from "lucide-react"

import { useCreateAdminHotelType } from "../../../../../../../../hooks/dashboard/admin/hotel-types-hooks/useAdminHotelTypeMutations"

export default function DBCreateHotelType() {
    const navigate = useNavigate()

    const { mutate: createHotelType, isPending: isCreating } = useCreateAdminHotelType()

    const [form, setForm] = useState({
        name: "",
        slug: "",
    })

    const handleNameChange = (e) => {
        const name = e.target.value
        const slug = name.toLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e")
            .replace(/ì|í|ị|ỉ|ĩ/g, "i")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u")
            .replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y")
            .replace(/đ/g, "d")
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
        
        setForm(prev => ({ ...prev, name: name, slug }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name) return

        const payload = {
            name: form.name,
            slug: form.slug,
        }

        createHotelType(payload, {
            onSuccess: () => {
                navigate("/admin/dashboard/hotel-types")
            }
        })
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
                    <h1 className="mb-1 text-3xl font-bold text-gray-900">Thêm loại khách sạn mới</h1>
                    <p className="text-gray-500 text-sm">Điền thông tin bên dưới để tạo và thêm loại khách sạn mới vào hệ thống.</p>
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
                        <Building2 size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Thông tin chi tiết</h2>
                        <p className="text-sm text-gray-500 mt-1">Vui lòng cung cấp đầy đủ thông tin.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 max-w-xl">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Tên loại khách sạn</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                            placeholder="Ví dụ: Khách sạn 5 sao..."
                            value={form.name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Slug (Tự động sinh)</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-mono text-sm outline-none cursor-not-allowed"
                            readOnly
                            value={form.slug}
                            placeholder="slug-se-tu-dong-sinh"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer text-center"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={isCreating}
                            type="submit"
                            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isCreating ? "Đang lưu..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
