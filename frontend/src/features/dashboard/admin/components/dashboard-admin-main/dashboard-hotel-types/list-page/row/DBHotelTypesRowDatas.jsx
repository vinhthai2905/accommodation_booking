import { Building2 } from "lucide-react"

export default function DBHotelTypesRowDatas({ hotelType }) {
    return (
        <>
            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <Building2 size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {hotelType.name}
                        </p>
                    </div>
                </div>
            </td>

            <td className="p-4">
                <span className="text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    {hotelType.slug}
                </span>
            </td>
        </>
    )
}
