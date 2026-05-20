import { clsx } from "clsx"

export default function ErrorLoadingHotelDatas({ errorMessage, alterMessageError, error }) {
    let displayMessage = errorMessage || alterMessageError;

    // Phát hiện lỗi 404 (đối tác chưa đăng ký/liên kết khách sạn)
    const is404 = 
        errorMessage?.includes("404") || 
        alterMessageError?.includes("404") || 
        error?.response?.status === 404 ||
        error?.status === 404;

    if (is404) {
        displayMessage = "Tài khoản đối tác của bạn chưa được liên kết với bất kỳ khách sạn nào trên hệ thống.\n\nHướng dẫn khắc phục:\n1. Truy cập trang quản trị Admin tại http://localhost:8000/admin/\n2. Đăng nhập bằng tài khoản Admin.\n3. Tìm mục Khách sạn (app_hotel/KhachSan) và nhấn thêm mới hoặc chỉnh sửa khách sạn có sẵn.\n4. Tại phần 'Id user' (Đối tác), chọn đúng tài khoản đối tác của bạn (Nguyen T) và lưu lại.\n5. Sau đó quay lại trang này và F5 tải lại trang.";
    } else if (errorMessage === "Request failed with status code 404") {
        displayMessage = alterMessageError || "Không thể tải dữ liệu. Vui lòng thử lại sau.";
    }

    return (
        <div
            className={clsx(
                "mx-auto mt-10 max-w-2xl p-6",
                "rounded-xl border border-red-200 bg-red-50 shadow-sm",
                "text-red-600"
            )}>
            <h3 className="text-xl font-bold mb-2">Đã xảy ra lỗi.</h3>
            <p className="whitespace-pre-line leading-relaxed text-sm font-medium">{displayMessage}</p>
        </div>
    )
}