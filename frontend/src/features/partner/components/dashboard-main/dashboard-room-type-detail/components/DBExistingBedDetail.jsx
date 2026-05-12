import { clsx } from "clsx"

import { Loader2, BedDouble, Trash2 } from "lucide-react"

export default function DBExistingBedDetail({ bedDetails, delRoolTypeDetailMutation }) {
    return (
        <div className="flex-1 overflow-y-auto p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-4">
                Danh sách giường hiện tại
            </p>


            {bedDetails?.length === 0 
                ? (
                <div className={clsx(
                    "flex flex-col items-center justify-center py-16 gap-3",
                    "text-gray-400"
                )}>
                    <BedDouble size={40} className="text-gray-200" />
                    <p className="text-sm font-medium">Chưa có thông tin giường nào.</p>
                    <p className="text-xs text-gray-300">Thêm cấu hình giường bên dưới.</p>
                </div>
            )   
                : (
                <div className="space-y-3">
                    {bedDetails?.map((detail) => (
                        <div
                            key={detail.id_room_type_detail}
                            className={clsx(
                                "flex items-center justify-between px-4 py-3.5",
                                "rounded-xl border border-gray-100 bg-gray-50/60",
                                "hover:border-violet-200 hover:bg-violet-50/40 transition-all duration-150 group"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                                    <BedDouble size={17} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800">{detail.bed_name}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        {detail.bed_size && (
                                            <span className="text-[11px] text-gray-400">{detail.bed_size}</span>
                                        )}
                                        {detail.bed_max_capacity && (
                                            <span className="text-[11px] text-gray-400">
                                                · Tối đa {detail.bed_max_capacity} khách
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className={clsx(
                                    "inline-flex items-center px-2.5 py-1 rounded-lg",
                                    "text-xs font-bold text-violet-700 bg-violet-100 border border-violet-200/80"
                                )}>
                                    × {detail.bed_quantity}
                                </span>
                                <button
                                    type="button"
                                    disabled={delRoolTypeDetailMutation.isPending}
                                    onClick={() => delRoolTypeDetailMutation.mutate(detail.id_room_type_detail)}
                                    className={clsx(
                                        "p-1.5 rounded-lg text-gray-300",
                                        "hover:text-rose-500 hover:bg-rose-50 transition-all duration-150 cursor-pointer",
                                        "disabled:opacity-50 disabled:cursor-not-allowed"
                                    )}
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}