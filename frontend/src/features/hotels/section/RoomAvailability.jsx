import RoomRow from "../components/hotel-room-availability/RoomRow"
import RoomAvailabilityHeaderRow from "../components/hotel-room-availability/RoomAvailabilityHeaderRow"
import RoomGuestSelectedAnalyzation from "../components/hotel-room-availability/RoomGuestSelectedAnalyzation"

import { clsx } from "clsx"
import { Users, CreditCard, Info } from "lucide-react"

import useHotelDetailsContext from "../../../hooks/hotel/useHotelDetailsContext"
import useBookingContext from "../../../hooks/common/useBookingContext"
import useBookingNavigation from "../../../hooks/hotel/useBookingNavigation"
import useAnalyzeGuestSelections from "../../../hooks/hotel/useAnalyzeGuestSelections"

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

    const { 
        numAdults,
        childrenAges,
        isOverCapacity,
        adultEquivalentGuestCount 
    } = useAnalyzeGuestSelections(bookingSearchParams, childPolicy, selectedRoomIds, maxCapacitySelected)

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
                        {roomTypes?.length > 0 ? (
                            roomTypes.map((roomType) => (
                                <RoomRow
                                    key={roomType.id_room_type}
                                    roomType={roomType}
                                    handleRoomSelection={handleRoomSelection}
                                />
                            ))
                        ) : (
                            <div className="p-8 text-center text-slate-500">
                                Vui lòng chọn ngày nhận/trả phòng để xem phòng trống.
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-4 top-6">
                    <div className="border border-slate-200 rounded-xl shadow-sm bg-white overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200 flex items-center gap-2">
                            <CreditCard size={18} className="text-blue-600" />
                            <span className="font-bold text-slate-900">Chi tiết thanh toán</span>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            {selectedRoomIds.length > 0 ? (
                               <RoomGuestSelectedAnalyzation 
                                    selectedRoomIds={selectedRoomIds}
                                    totalPrice={totalPrice}
                                    isOverCapacity={isOverCapacity}
                                    maxCapacitySelected={maxCapacitySelected}
                                    adultEquivalentGuestCount={adultEquivalentGuestCount}
                                    childPolicy={childPolicy}
                                    bookingSearchParams={bookingSearchParams}
                               />
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