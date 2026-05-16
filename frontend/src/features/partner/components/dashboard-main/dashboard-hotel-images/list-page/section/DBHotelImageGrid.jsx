import { Image as ImageIcon, Star, Trash2, Edit2 } from "lucide-react"
import { clsx } from "clsx"

export default function DBHotelImageGrid({ images = [], onSetPrimary, onDelete, onEdit }) {
    if (!images || images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-8 text-gray-400">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-gray-200">
                    <ImageIcon size={40} className="opacity-50" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-1">Chưa có hình ảnh nào</p>
                <p className="text-sm">Khách sạn của bạn chưa được tải lên hình ảnh.</p>
            </div>
        )
    }

    return (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((img) => (
                <div 
                    key={img.id_hotel_image} 
                    className={clsx(
                        "relative group aspect-[4/3] rounded-2xl overflow-hidden border-[3px] transition-all bg-gray-100",
                        img.is_primary ? "border-blue-500 shadow-md shadow-blue-500/20" : "border-transparent shadow-sm hover:shadow-md"
                    )}
                >
                    <img
                        src={img.url}
                        alt={img.image_name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Dark gradient overlay on hover for better button visibility */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                    
                    {/* Primary Badge */}
                    {img.is_primary && (
                        <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 z-10">
                            <Star size={14} className="fill-white" />
                            Ảnh chính
                        </div>
                    )}
                    
                    {/* Hover Actions */}
                    <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                        {!img.is_primary && (
                            <button 
                                onClick={() => onSetPrimary && onSetPrimary(img.id_hotel_image)}
                                title="Đặt làm ảnh chính"
                                className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 hover:scale-110 transition-all cursor-pointer"
                            >
                                <Star size={18} />
                            </button>
                        )}
                        <button 
                            onClick={() => onEdit && onEdit(img.id_hotel_image)}
                            title="Đổi tên ảnh"
                            className="w-10 h-10 bg-white text-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 hover:scale-110 transition-all cursor-pointer"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button 
                            onClick={() => onDelete && onDelete(img.id_hotel_image)}
                            title="Xóa ảnh"
                            className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center shadow-lg hover:bg-red-50 hover:scale-110 transition-all cursor-pointer"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    
                    {/* Bottom gradient and Image Name */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                        <p className="text-white text-sm font-medium truncate drop-shadow-md">
                            {img.image_name || "Chưa có tên"}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
