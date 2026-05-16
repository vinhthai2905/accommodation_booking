import { Edit2, Trash2, Star } from "lucide-react"

export default function DBHotelImageRowActions({ 
    setIsMenuOpen, 
    setIsEditModalOpen, 
    setIsDeleteModalOpen,
    handleSetPrimary
}) {
    return (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10 font-medium">
            <button
                onClick={() => {
                    handleSetPrimary()
                    setIsMenuOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
                <Star size={16} />
                Đặt làm ảnh chính
            </button>
            <button
                onClick={() => {
                    setIsEditModalOpen(true)
                    setIsMenuOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
            >
                <Edit2 size={16} />
                Chỉnh sửa tên
            </button>
            <div className="h-px bg-gray-100 my-1"></div>
            <button
                onClick={() => {
                    setIsDeleteModalOpen(true)
                    setIsMenuOpen(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
            >
                <Trash2 size={16} />
                Xóa hình ảnh
            </button>
        </div>
    )
}
