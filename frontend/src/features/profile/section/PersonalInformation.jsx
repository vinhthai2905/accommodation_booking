import { Camera } from "lucide-react"

export default function PersonalInformation() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Thông tin cá nhân</h1>
                    <p className="text-slate-500 mt-2">
                        Cập nhật thông tin của bạn và tìm hiểu cách thông tin được sử dụng.
                    </p>
                </div>

                <div className="relative shrink-0">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-medium">
                        V
                    </div>
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                        <Camera className="w-4 h-4 text-slate-600" />
                    </button>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="py-5 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0">
                        <span className="text-slate-900">Tên</span>
                    </div>
                    <div className="flex-1 text-slate-900">
                        Vinh Thai
                    </div>
                    <div className="shrink-0">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0">
                        <span className="text-slate-900">Tên hiển thị</span>
                    </div>
                    <div className="flex-1 text-slate-500">
                        Chọn tên hiển thị
                    </div>
                    <div className="shrink-0">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0 pt-1">
                        <span className="text-slate-900">Địa chỉ email</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-900">vinhthai2905@gmail.com</span>
                            <span className="bg-green-600 text-white text-[11px] font-medium px-1.5 py-0.5 rounded tracking-wide">Đã xác minh</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">
                            Đây là địa chỉ email bạn dùng để đăng nhập. Đây cũng là nơi chúng tôi gửi xác nhận đặt phòng của bạn.
                        </p>
                        <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                            <p className="text-sm text-slate-600 mb-2">
                                Không thể truy cập email của bạn? Nếu bạn đã thêm số điện thoại di động cho một trong những lần lưu trú đã hoàn tất trước đó, bạn có thể thay đổi địa chỉ email của mình bằng cách xác minh số điện thoại di động
                            </p>
                            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                Thay đổi email bằng xác minh điện thoại
                            </button>
                        </div>
                    </div>
                    <div className="shrink-0 pt-1">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0 pt-1">
                        <span className="text-slate-900">Số điện thoại</span>
                    </div>
                    <div className="flex-1">
                        <div className="text-slate-500">Thêm số điện thoại của bạn</div>
                        <p className="text-slate-500 text-sm mt-1">
                            Chỗ nghỉ hoặc điểm du lịch bạn đặt sẽ sử dụng số này nếu họ cần liên hệ với bạn.
                        </p>
                    </div>
                    <div className="shrink-0 pt-1">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0">
                        <span className="text-slate-900">Ngày sinh</span>
                    </div>
                    <div className="flex-1 text-slate-500">
                        Nhập ngày sinh của bạn
                    </div>
                    <div className="shrink-0">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0">
                        <span className="text-slate-900">Quốc tịch</span>
                    </div>
                    <div className="flex-1 text-slate-500">
                        Chọn quốc gia/khu vực bạn đến từ
                    </div>
                    <div className="shrink-0">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0">
                        <span className="text-slate-900">Giới tính</span>
                    </div>
                    <div className="flex-1 text-slate-500">
                        Chọn giới tính của bạn
                    </div>
                    <div className="shrink-0">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>

                <div className="py-5 flex flex-col sm:flex-row sm:items-center gap-4 border-b border-gray-200">
                    <div className="sm:w-64 shrink-0">
                        <span className="text-slate-900">Địa chỉ</span>
                    </div>
                    <div className="flex-1 text-slate-500">
                        Thêm địa chỉ của bạn
                    </div>
                    <div className="shrink-0">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">Chỉnh sửa</button>
                    </div>
                </div>
            </div>
        </div>
    )
}