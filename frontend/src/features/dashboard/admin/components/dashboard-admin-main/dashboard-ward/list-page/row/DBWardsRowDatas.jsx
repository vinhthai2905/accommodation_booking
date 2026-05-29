import { clsx } from "clsx"
import { MapPin } from "lucide-react"

export default function DBWardsRowDatas({ ward }) {
    return (
        <>
            <td className="p-4 text-center">
                <input
                    type="checkbox"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
            </td>

            <td className="p-4 text-gray-600 font-medium">
                <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-lg text-xs font-semibold font-mono">
                    #{ward.id_ward}
                </span>
            </td>

            <td className="p-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-gray-50 to-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-600 shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <MapPin size={18} />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {ward.ward_name}
                        </p>
                    </div>
                </div>
            </td>

            <td className="p-4 text-center">
                <span className={clsx(
                    "inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide uppercase shadow-sm",
                    "bg-blue-50 text-blue-700 border border-blue-200/80"
                )}>
                    {ward.city_name}
                </span>
            </td>

            <td className="p-4 text-center">
                <span className="text-sm font-mono text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    {ward.slug}
                </span>
            </td>
        </>
    )
}
