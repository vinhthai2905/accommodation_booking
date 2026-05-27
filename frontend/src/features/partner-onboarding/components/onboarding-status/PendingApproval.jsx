import { Clock, Info, Loader2, RefreshCw } from "lucide-react"

export default function PendingApproval({ registration, loadingStatus, checkRegistrationStatus, clearAuthUserState }) {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center max-w-lg mx-auto mt-10 space-y-6">
            <div className="w-16 h-16 bg-blue-50 text-[#003b95] rounded-full flex items-center justify-center mx-auto animate-pulse">
                <Clock size={40} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký đang được xử lý</h2>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Đơn đăng ký chỗ nghỉ <strong>{registration?.hotel_name}</strong> của bạn đã được gửi tới hệ thống và đang chờ quản trị viên phê duyệt.
                </p>
            </div>

            {/* Summary of submitted registration details */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 text-left space-y-3 text-sm text-gray-900">
                <h3 className="font-bold text-gray-700 border-b border-gray-200 pb-2 flex items-center gap-1.5">
                    <Info size={16} className="text-blue-600" /> Chi tiết đơn đăng ký:
                </h3>
                <div className="grid grid-cols-3 py-1">
                    <span className="text-gray-500 col-span-1">Tên chỗ nghỉ:</span>
                    <span className="font-semibold text-gray-800 col-span-2 text-right">{registration?.hotel_name}</span>
                </div>
                <div className="grid grid-cols-3 py-1">
                    <span className="text-gray-500 col-span-1">Địa chỉ:</span>
                    <span className="font-semibold text-gray-800 col-span-2 text-right">{registration?.address}</span>
                </div>
                <div className="grid grid-cols-3 py-1">
                    <span className="text-gray-500 col-span-1">Số điện thoại:</span>
                    <span className="font-semibold text-gray-800 col-span-2 text-right">{registration?.phone_number}</span>
                </div>
                {registration?.document_name && (
                    <div className="grid grid-cols-3 py-1">
                        <span className="text-gray-500 col-span-1">Tài liệu pháp lý:</span>
                        <span className="font-semibold text-gray-800 col-span-2 text-right">{registration.document_name}</span>
                    </div>
                )}
            </div>

            <div className="text-xs text-gray-500 leading-normal bg-blue-50 border border-blue-100 rounded-lg p-3.5 text-left">
                Chúng tôi thường xem xét và kích hoạt tài khoản đối tác trong vòng 24 giờ làm việc. Bạn sẽ có thể truy cập dashboard quản lý sau khi được duyệt.
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                    onClick={() => checkRegistrationStatus(true)}
                    disabled={loadingStatus}
                    className="flex-1 py-2.5 px-4 bg-[#003b95] hover:bg-[#002f75] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm disabled:bg-blue-400 text-sm"
                >
                    {loadingStatus ? (
                        <>
                            <Loader2 className="animate-spin" size={18} /> Đang kiểm tra...
                        </>
                    ) : (
                        <>
                            <RefreshCw size={16} /> Kiểm tra lại trạng thái
                        </>
                    )}
                </button>
                
                <button
                    onClick={clearAuthUserState}
                    className="flex-1 py-2.5 px-4 border border-gray-300 hover:bg-gray-50 text-gray-900 font-bold rounded-lg transition-colors text-sm text-gray-900 bg-white"
                >
                    Đăng xuất
                </button>
            </div>
        </div>
    )
}
