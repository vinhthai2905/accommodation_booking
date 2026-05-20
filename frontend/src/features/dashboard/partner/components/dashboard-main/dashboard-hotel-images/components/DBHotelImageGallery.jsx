import { Image as ImageIcon, Star } from "lucide-react"
import { clsx } from "clsx"

export default function DBHotelImageGallery({ images = [] }) {
    if (!images || images.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-gray-400">
                <ImageIcon size={32} className="mb-2 opacity-50" />
                <p className="text-sm font-medium">Chưa có hình ảnh nào</p>
                <p className="text-xs mt-1">Khách sạn của bạn chưa được tải lên hình ảnh.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img) => (
                <div 
                    key={img.id_hotel_image} 
                    className={clsx(
                        "relative group aspect-square rounded-xl overflow-hidden border-2",
                        img.is_primary ? "border-blue-500 shadow-md" : "border-transparent"
                    )}
                >
                    <img
                        src={img.url}
                        alt={img.image_name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Overlay gradient for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Primary Badge */}
                    {img.is_primary && (
                        <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                            <Star size={12} className="fill-white" />
                            Ảnh chính
                        </div>
                    )}
                    
                    {/* Image Name (visible on hover) */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-xs font-medium truncate drop-shadow-md">
                            {img.image_name}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}
