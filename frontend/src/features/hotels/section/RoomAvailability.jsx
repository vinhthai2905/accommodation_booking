import RoomRow from "../components/RoomRow"
import RoomAvailabilityHeaderRow from "../components/RoomAvailabilityHeaderRow"

import { clsx } from "clsx"
import { Link } from "react-router"
import { AlertTriangle, Users, Baby, CreditCard, ChevronRight, Info } from "lucide-react"

import useHotelDetailsContext from "../../../hooks/hotel/useHotelDetailsContext"
import useBookingNavigation from "../../../hooks/hotel/useBookingNavigation"
import useBookingContext from "../../../hooks/common/useBookingContext"

export default function RoomAvailability() {
    const { bookingSearchParams } = useBookingNavigation()
    const { roomTypesQuery, childPolicyQuery: { childPolicy } } = useHotelDetailsContext()

    const { data: roomTypes } = roomTypesQuery

    const {
        handleRoomSelection,
        selectedRoomIds,
        totalPrice,
        maxCapacitySelected
    } = useBookingContext()

    const adults = bookingSearchParams.get("adults")
    const childrenAges = bookingSearchParams.getAll("age")

    const numAdults = parseInt(adults || "0")

    let childrenAdultCount = 0
    let childrenFreeStayCount = 0

    if (childPolicy && childrenAges.length > 0) {
        childrenAges.forEach(age => {
            const ageNum = parseInt(age)
            if (ageNum >= childPolicy.adult_age_from) {
                childrenAdultCount += 1
                return
            }

            if (ageNum < childPolicy.max_free_age) {
                childrenFreeStayCount += 1
                return
            }
        })
    }

    const adultEquivalentGuestCount = numAdults + childrenAdultCount
    const isOverCapacity = selectedRoomIds.length > 0 && adultEquivalentGuestCount > maxCapacitySelected

    return (
        <div className="flex flex-col gap-6 text-slate-800">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    Phòng trống
                </h1>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    <Users size={16} />
                    <span>{numAdults} người lớn {childrenAges.length > 0 && `· ${childrenAges.length} trẻ em`}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
                <div className={clsx(
                    "flex flex-col overflow-hidden",
                    "border border-slate-200 rounded-xl shadow-sm",
                    "bg-white"
                )}>
                    <div className={clsx(
                        "grid grid-cols-[1.2fr_0.4fr_0.7fr_1fr]",
                        "bg-[#003580] border-b border-[#003580]"
                    )}>
                        <RoomAvailabilityHeaderRow />
                    </div>

                    <div className="divide-y divide-slate-100">
                        {roomTypes.map((roomType) => (
                            <RoomRow
                                key={roomType.id_room_type}
                                roomType={roomType}
                                handleRoomSelection={handleRoomSelection}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4 sticky top-6">
                    <div className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center gap-2">
                            <CreditCard size={18} className="text-blue-600" />
                            <span className="font-bold text-slate-900">Chi tiết thanh toán</span>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            {selectedRoomIds.length > 0 ? (
                                <>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs text-slate-500">
                                            Đã chọn {selectedRoomIds.length} phòng
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
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-xl">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                        <Info size={24} className="text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-500">
                                        Chưa có phòng nào được chọn
                                    </p>
                                    <p className="text-xs text-slate-400 mt-1">
                                        Vui lòng chọn loại phòng phù hợp để tiếp tục
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}