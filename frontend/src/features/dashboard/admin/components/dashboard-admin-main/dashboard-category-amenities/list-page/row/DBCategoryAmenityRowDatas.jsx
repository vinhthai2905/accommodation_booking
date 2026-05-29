import { clsx } from "clsx"
import { ShieldCheck } from "lucide-react"

export default function DBCategoryAmenityRowDatas({ amenity }) {
    return (
        <>
            <td className="p-4 text-center w-12 whitespace-nowrap">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </td>

            <td className="p-4 w-28 text-gray-600 font-medium whitespace-nowrap">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono">
                    #{amenity.id_hotel_amenity}
                </span>
            </td>

            <td className="p-4 w-[320px] whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <ShieldCheck size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {amenity.amenity_name}
                        </p>
                    </div>
                </div>
            </td>

            <td className="p-4 w-40 whitespace-nowrap">
                <span className={clsx(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                    amenity.scope === "public"
                        ? "bg-purple-50 text-purple-700 border border-purple-200/80"
                        : "bg-blue-50 text-blue-700 border border-blue-200/80"
                )}>
                    {amenity.scope === "public" ? "Công cộng" : "Trong phòng"}
                </span>
            </td>
        </>
    )
}
