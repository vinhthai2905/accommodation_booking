import { Info } from "lucide-react"
import useHotelDetailsContext from "../../../../hooks/hotel/useHotelDetailsContext"

export default function RoomPriceColumn({ roomType }) {
    const { refundPolicyQuery: { data: refundPolicy } } = useHotelDetailsContext()

    return (
        <div className="px-4 py-3 flex flex-col gap-2 justify-start">
            <div className="flex items-center gap-1">
                <span className="text-base font-bold text-slate-900">
                    {Intl.NumberFormat("vi-VN").format(roomType.price)}
                </span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">VND</span>
            </div>
            
            <div className="flex flex-wrap gap-1">
                <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-wider">
                    Genius
                </span>
                <span className="bg-emerald-600 text-white px-1.5 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider">
                    Ưu Đãi Mùa Du Lịch
                </span>
            </div>

            {refundPolicy && (
                <div className="mt-1 flex flex-col gap-0.5">
                    {refundPolicy.is_cancellation_allowed ? (
                        <>
                            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
                                <Info size={12} /> Cho phép hủy phòng
                            </span>
                            <span className="text-[10px] text-slate-500">
                                {refundPolicy.penalty_percentage}% nếu còn {refundPolicy.days_before_arrival_penalty} ngày trước khi nhận phòng
                            </span>
                        </>
                    ) : (
                        <span className="text-[11px] font-medium text-red-600 flex items-center gap-1">
                            <Info size={12} /> Không hoàn tiền
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}