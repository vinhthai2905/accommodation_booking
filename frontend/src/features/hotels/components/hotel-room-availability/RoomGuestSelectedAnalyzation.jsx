import { clsx } from "clsx"
import { AlertTriangle, Baby, ChevronRight, BookKey } from "lucide-react"
import { Link } from "react-router"
import { getNightsFromSearchParams } from "../../../../helpers/booking/bookingHelpers"

export default function RoomGuestSelectedAnalyzation({
    selectedRoomIds,
    totalPrice,
    isOverCapacity,
    maxCapacitySelected,
    adultEquivalentGuestCount,
    childPolicy,
    bookingSearchParams
}) {
    const nights = getNightsFromSearchParams()

    return (
        <>
            <div className="flex flex-col gap-1">
                <span className="text-xs text-slate-500">
                    Đã chọn {selectedRoomIds.length} phòng ({nights} đêm)
                </span>
                <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#003580]">
                        {Intl.NumberFormat("vi-VN").format(totalPrice)}
                    </span>
                    <span className="text-xs font-bold text-[#003580]">VND</span>
                </div>
            </div>

            {isOverCapacity && (
                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700 animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertTriangle className="shrink-0 mt-0.5" size={20} />
                    <div className="text-sm leading-relaxed">
                        <p className="font-bold mb-1">Thiếu chỗ ở</p>
                        Sức chứa hiện tại ({maxCapacitySelected}) không đủ cho {adultEquivalentGuestCount} người.
                    </div>
                </div>
            )}

            {childPolicy && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-blue-800 font-bold text-sm">
                        <Baby size={18} />
                        <span>Chính sách trẻ em</span>
                    </div>
                    <div className="text-xs text-blue-700/80 flex flex-col gap-2 leading-relaxed">
                        <p className="flex items-start gap-2">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                            Trẻ em từ {childPolicy.adult_age_from} tuổi trở lên được tính như người lớn.
                        </p>
                        {childPolicy.max_free_age > 0 && (
                            <p className="flex items-start gap-2">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-400" />
                                Trẻ em dưới {childPolicy.max_free_age} tuổi được ở miễn phí.
                            </p>
                        )}
                    </div>
                </div>
            )}

            <Link
                to={{
                    pathname: "/book.html",
                    search: `?${bookingSearchParams}`
                }}
                className={clsx(
                    "w-full px-6 py-3",
                    "flex items-center justify-center gap-2",
                    "font-bold rounded-xl transition-all duration-200",
                    isOverCapacity
                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-[0.98]"
                )}
                onClick={(e) => isOverCapacity && e.preventDefault()}
            >
                <span>Đặt ngay</span>
                {!isOverCapacity && <ChevronRight size={18} />}
            </Link>

            <p className="text-[10px] text-center text-slate-400">
                Bằng cách nhấn "Đặt ngay", bạn đồng ý với các điều khoản và chính sách của chúng tôi.
            </p>
        </>
    )
}