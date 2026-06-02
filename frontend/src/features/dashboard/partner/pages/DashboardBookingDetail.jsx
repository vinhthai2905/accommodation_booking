import { useParams, useNavigate } from "react-router"
import { motion } from "framer-motion"
import { ArrowLeft, User, Calendar, CreditCard, BedDouble, CheckCircle, LogOut, XCircle, Clock } from "lucide-react"

import LoadingBookings from "../../ui/loading/LoadingHotelDatas"
import ErrorLoadingBookings from "../../ui/loading/ErrorLoadingHotelDatas"

import { usePartnerBookingDetail } from "../../../../hooks/dashboard/partner/booking-hooks/services/usePartnerBookingDetail"
import { usePartnerBookingStatusMutation } from "../../../../hooks/dashboard/partner/booking-hooks/services/usePartnerBookingMutations"
import { formatCurrency } from "../../../../helpers/booking/bookingHelpers"

export default function DashboardBookingDetail() {
    const { id_booking } = useParams()
    const navigate = useNavigate()
    
    const { booking, isLoading, isError, error } = usePartnerBookingDetail(id_booking)
    const { updateStatusMutation } = usePartnerBookingStatusMutation()

    if (isLoading) return <LoadingBookings labelLoading="Đang tải chi tiết đặt phòng..." />
    if (isError) return <ErrorLoadingBookings errorMessage={error.message} alterMessageError="Không thể tải chi tiết đặt phòng." />
    
    const handleConfirm = () => updateStatusMutation.mutate({ bookingId: id_booking, status: "CONFIRMED" })
    const handleCheckout = () => updateStatusMutation.mutate({ bookingId: id_booking, status: "COMPLETED" })
    const handleCancel = () => {
        if (window.confirm("Bạn có chắc chắn muốn hủy đơn đặt phòng này không?")) {
            updateStatusMutation.mutate({ bookingId: id_booking, status: "CANCELLED" })
        }
    }

    const statusRaw = booking.status || "PENDING"
    let statusDisplay = "Chờ nhận phòng"
    let statusColor = "bg-amber-50 text-amber-700 border border-amber-200/80"

    switch (statusRaw.toUpperCase()) {
        case "CONFIRMED":
            statusDisplay = "Đã nhận phòng"
            statusColor = "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
            break
        case "COMPLETED":
            statusDisplay = "Đã trả phòng"
            statusColor = "bg-emerald-50 text-emerald-700 border border-emerald-200/80"
            break
        case "CANCELLED":
            statusDisplay = "Đã hủy"
            statusColor = "bg-rose-50 text-rose-700 border border-rose-200/80"
            break
        case "PENDING":
        default:
            statusDisplay = "Chờ nhận phòng"
            statusColor = "bg-amber-50 text-amber-700 border border-amber-200/80"
            break
    }

    return (
        <main className="flex h-full flex-col gap-6 p-6 bg-gray-50/50 overflow-y-auto">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-800">Chi tiết đặt phòng</h1>
                    <p className="text-gray-500 text-sm">Quản lý thông tin chi tiết đơn đặt phòng.</p>
                </div>
                <div className={`px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase shadow-sm ${statusColor}`}>
                    {statusDisplay}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
                {/* Thông tin chính */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <Calendar className="text-blue-500" size={20} /> Thời gian & Ghi chú
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Ngày nhận phòng</p>
                                <p className="font-medium text-gray-800">{booking.check_in_date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ngày trả phòng</p>
                                <p className="font-medium text-gray-800">{booking.check_out_date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 flex items-center gap-1"><Clock size={14}/> Giờ nhận phòng thực tế</p>
                                <p className="font-medium text-gray-800">{booking.check_in_time ? booking.check_in_time : "Chưa chọn"}</p>
                            </div>
                            <div className="col-span-2 mt-2">
                                <p className="text-sm text-gray-500">Ghi chú của khách</p>
                                <p className="font-medium text-gray-800 bg-gray-50 p-3 rounded-lg mt-1 min-h-[60px]">
                                    {booking.note || "Không có ghi chú"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <BedDouble className="text-violet-500" size={20} /> Thông tin phòng đặt ({booking.total_room_quantity} phòng)
                        </h2>
                        <div className="space-y-3">
                            {booking.booked_rooms && booking.booked_rooms.map((room, index) => (
                                <div key={index} className="flex flex-col p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-medium text-gray-700">{room.room_type_name}</span>
                                        <span className="bg-violet-100 text-violet-700 px-3 py-1 text-sm font-semibold rounded-full">
                                            {room.quantity} phòng
                                        </span>
                                    </div>
                                    {room.room_names && room.room_names.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {room.room_names.map((rn, idx) => (
                                                <span key={idx} className="bg-white border border-gray-200 text-gray-600 px-2.5 py-1 text-xs font-medium rounded-md shadow-sm">
                                                    Phòng {rn}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-sm text-gray-600">
                            <span>Người lớn: <b>{booking.total_adults}</b></span>
                            <span>Trẻ em: <b>{booking.total_children}</b></span>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <User className="text-emerald-500" size={20} /> Khách hàng
                        </h2>
                        <div>
                            <p className="text-sm text-gray-500">Email khách hàng</p>
                            <p className="font-medium text-gray-800">{booking.booking_user?.email}</p>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                            <CreditCard className="text-amber-500" size={20} /> Thanh toán
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Tổng tiền</span>
                                <span className="font-bold text-gray-800">{booking.invoice ? formatCurrency(booking.invoice.total_amount) : '0 ₫'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Phương thức</span>
                                <span className="font-medium text-gray-800">{booking.payment?.payment_method || 'Chưa có'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Trạng thái TT</span>
                                <span className="font-medium text-gray-800">{booking.payment?.status || 'Chưa thanh toán'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Hành động */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h2 className="text-lg font-semibold mb-4">Cập nhật trạng thái</h2>
                        <div className="flex flex-col gap-3">
                            {booking.status === "PENDING" && (
                                <button 
                                    onClick={handleConfirm}
                                    disabled={updateStatusMutation.isPending}
                                    className="w-full flex justify-center items-center gap-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 p-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                                >
                                    <CheckCircle size={18} /> Xác nhận nhận phòng
                                </button>
                            )}
                            
                            {booking.status === "CONFIRMED" && (
                                <button 
                                    onClick={handleCheckout}
                                    disabled={updateStatusMutation.isPending}
                                    className="w-full flex justify-center items-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 p-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                                >
                                    <LogOut size={18} /> Đã trả phòng
                                </button>
                            )}
                            
                            {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                                <button 
                                    onClick={handleCancel}
                                    disabled={updateStatusMutation.isPending}
                                    className="w-full flex justify-center items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 p-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                                >
                                    <XCircle size={18} /> Hủy đặt phòng
                                </button>
                            )}
                            
                            {booking.status === "COMPLETED" && (
                                <div className="text-center text-sm font-medium text-emerald-600 bg-emerald-50 p-3 rounded-xl">
                                    Đơn đặt phòng đã hoàn thành
                                </div>
                            )}
                            {booking.status === "CANCELLED" && (
                                <div className="text-center text-sm font-medium text-rose-600 bg-rose-50 p-3 rounded-xl">
                                    Đơn đặt phòng đã bị hủy
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </main>
    )
}
