import { useCreatePartnerHotelCategory } from "@/hooks/dashboard/partner/hotel-hooks/services/usePartnerHotelAmenityMutations";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

export default function AddCategoryModal({ setIsAddModalOpen }) {
    const { mutate: createCategory, isPending } = useCreatePartnerHotelCategory()
    const [form, setForm] = useState({
        name: "",
        slug: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createCategory(form, {
            onSuccess: () => setIsAddModalOpen(false)
        })
    }

    const handleNameChange = (e) => {
        const name = e.target.value
        const slug = name.toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "")
        
        setForm({ name, slug })
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md overflow-hidden bg-white rounded-2xl shadow-xl"
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Thêm danh mục mới</h2>
                    <button
                        onClick={() => setIsAddModalOpen(false)}
                        className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Tên danh mục</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                            placeholder="Ví dụ: Tiện nghi chung"
                            value={form.name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700">Slug</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-mono text-sm outline-none cursor-not-allowed"
                            readOnly
                            value={form.slug}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer"
                        >
                            Hủy
                        </button>
                        <button
                            disabled={isPending}
                            type="submit"
                            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Đang lưu..." : "Thêm danh mục"}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}
