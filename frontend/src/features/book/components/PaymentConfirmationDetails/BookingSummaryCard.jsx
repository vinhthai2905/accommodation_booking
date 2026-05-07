import { clsx } from "clsx"
import {
    Tag,
    Calendar,
    Bed,
} from "lucide-react"

export default function BookingSummaryCard({ booking }) {
    return (
        <div className="mt-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Tóm tắt đơn đặt</h2>

            <div className={clsx(
                "rounded-xl border border-gray-200",
                "bg-white",
                "p-4",
            )}>
                <div className="flex gap-4">
                    <img
                        src={booking?.hotel?.primary_image}
                        alt={booking?.hotel?.name}
                        className={clsx(
                            "shrink-0",
                            "w-16 h-16",
                            "rounded-lg object-cover",
                        )}
                    />

                    <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-slate-900">
                            {booking?.hotel?.name}
                        </h3>

                        <div className="mt-2 flex flex-col gap-1.5 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                                <Tag size={13} className="shrink-0 text-slate-400" />
                                <span>
                                    Tổng giá:{" "}
                                    <span className="font-semibold text-slate-800">
                                        VND {Intl.NumberFormat("vi-VN").format(booking?.invoice?.total_amount)}
                                    </span>
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Calendar size={13} className="shrink-0 text-slate-400" />
                                <span>
                                    {`${booking?.check_in_date} – ${booking?.check_out_date}`}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Bed size={13} className="shrink-0 text-slate-400" />
                                <span className="truncate">
                                    {booking?.room_type || "Căn Hộ Superior Có Ban Công Và Tầm Nhìn Ra Hồ Bơi"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        className={clsx(
                            "flex items-center justify-center",
                            "shrink-0 self-center",
                            "px-4 py-2",
                            "text-sm font-semibold text-white",
                            "bg-blue-600",
                            "rounded-lg",
                            "whitespace-nowrap",
                            "hover:bg-blue-700 active:bg-blue-800",
                            "transition-colors",
                        )}
                    >
                        Xem hoặc cập nhật chi tiết
                    </button>
                </div>
            </div>
        </div>
    )
}
