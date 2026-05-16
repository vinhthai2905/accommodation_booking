import { Star } from "lucide-react"
import { clsx } from "clsx"

export default function DBHotelImageRowDatas({ image }) {
    return (
        <>
            <td className="p-4 text-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            </td>
            
            <td className="p-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center">
                    {image.url ? (
                        <img 
                            src={image.url} 
                            alt={image.image_name} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xs text-gray-400">Trống</span>
                    )}
                </div>
            </td>

            <td className="p-4">
                <span className="font-medium text-gray-900">{image.image_name || "Chưa có tên"}</span>
            </td>

            <td className="p-4">
                {image.is_primary ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        <Star size={12} className="fill-blue-700" />
                        Ảnh chính
                    </span>
                ) : (
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                        Bình thường
                    </span>
                )}
            </td>
        </>
    )
}
