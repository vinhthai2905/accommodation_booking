import LoadingCreateAmenity from "../../../../../../ui/loading/LoadingHotelDatas"

import { clsx } from "clsx"
import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router"
import { motion } from "framer-motion"
import { ArrowLeft, Layout } from "lucide-react"

import { 
    useAdminHotelAmenityCategories 
} from "../../../../../../../../hooks/dashboard/admin/hotel-hooks/services/useAdminHotelAmenityCategories"

import { useCreateAdminAmenity } from "../../../../../../../../hooks/dashboard/admin/hotel-hooks/services/useAdminHotelAmenitiesMutations"

export default function DBCreateAmenity() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const categoryIdParam = searchParams.get("id_amenity_category")

    const { data: categories, isPending: isLoadingCategories } = useAdminHotelAmenityCategories()
    const { mutate: createAmenity, isPending: isCreating } = useCreateAdminAmenity()

    const [form, setForm] = useState({
        name: "",
        slug: "",
        id_amenity_category: "",
        scope: "room" // Mặc định là trong phòng
    })

    useEffect(() => {
        if (categoryIdParam) {
            setForm(prev => ({
                ...prev,
                id_amenity_category: categoryIdParam
            }))
        } else if (categories && categories.length > 0) {
            setForm(prev => ({
                ...prev,
                id_amenity_category: prev.id_amenity_category || String(categories[0].id_amenity_category)
            }))
        }
    }, [categoryIdParam, categories])

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
        
        setForm(prev => ({ ...prev, name, slug }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.name || !form.id_amenity_category) return

        const payload = {
            name: form.name,
            slug: form.slug,
            id_amenity_category: Number(form.id_amenity_category),
            scope: form.scope
        }

        createAmenity(payload, {
            onSuccess: () => {
                if (categoryIdParam) {
                    navigate(`/admin/category-amenities/${categoryIdParam}`)
                } else {
                    navigate("/admin/amenities")
                }
            }
        })
    }

    if (isLoadingCategories) {
        return <LoadingCreateAmenity labelLoading="Đang tải danh mục tiện nghi..." />
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
                    <h1 className="mb-1 text-3xl font-bold text-gray-900">Thêm tiện nghi mới</h1>
                    <p className="text-gray-500 text-sm">Điền thông tin bên dưới để tạo và thêm tiện nghi mới cho khách sạn.</p>
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
                        <Layout size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Thông tin chi tiết tiện nghi</h2>
                        <p className="text-sm text-gray-500 mt-1">Vui lòng cung cấp đầy đủ thông tin của tiện nghi.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5 max-w-xl">
                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Tên tiện nghi</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
                            placeholder="Ví dụ: Ấm siêu tốc, Bình nóng lạnh..."
                            value={form.name}
                            onChange={handleNameChange}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Slug tiện nghi (Tự động sinh)</label>
                        <input
                            required
                            type="text"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 font-mono text-sm outline-none cursor-not-allowed"
                            readOnly
                            value={form.slug}
                            placeholder="slug-se-tu-dong-sinh"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Danh mục tiện nghi</label>
                        {categoryIdParam ? (
                            <div className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm font-medium outline-none">
                                {categories?.find(c => c.id_amenity_category === Number(categoryIdParam))?.name || "Danh mục hiện tại"}
                            </div>
                        ) : (
                            <select
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-gray-700 bg-white"
                                value={form.id_amenity_category}
                                onChange={(e) => setForm(prev => ({ ...prev, id_amenity_category: e.target.value }))}
                            >
                                {categories?.map(category => (
                                    <option key={category.id_amenity_category} value={category.id_amenity_category}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider text-[11px]">Phạm vi tiện nghi</label>
                        <select
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm text-gray-700 bg-white"
                            value={form.scope}
                            onChange={(e) => setForm(prev => ({ ...prev, scope: e.target.value }))}
                        >
                            <option value="room">Trong phòng (Room)</option>
                            <option value="public">Công cộng (Public)</option>
                        </select>
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