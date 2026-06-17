import { clsx } from "clsx"

export default function HotelReviewGuestHighlight() {
    return (
        <div className={clsx(
            "flex flex-col grow"
        )}>
            <div className="border-t border-gray-200 pt-3 grow-2">
                <p className="text-sm font-bold text-gray-900 mb-1">Khách lưu trú ở đây thích điều gì?</p>
                <p className="text-sm text-gray-400 font-serif leading-none mt-2">“</p>
                <p className="text-sm text-gray-700">
                    Anh chủ nhiệt tình, dễ thương. Như các căn khác ở đây, nội thất hơi cũ nhưng vẫn sử dụng được rất tốt. 
                    Căn hộ, gọn gàng, sạch sẽ. Giá phòng tốt so...
                </p>
            </div>

            <div className="flex items-center gap-2 mt-2">
                <div
                    className={clsx(
                        "flex h-6 w-6 items-center justify-center rounded-full",
                        "bg-green-500 text-xs font-bold text-white"
                    )}
                >
                    P
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="font-bold text-gray-900">Phuong</span>
                    <div className="flex items-center gap-1">
                        <span className="text-sm">🇻🇳</span>
                        <span className="text-gray-500">Việt Nam</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
                <p className="text-sm font-bold text-gray-900">Nhân viên phục vụ</p>

                <div
                    className={clsx(
                        "flex h-7 px-2 items-center justify-center border-2 border-gray-900",
                        "text-sm font-bold text-gray-900",
                        "rounded-t-md rounded-br-md rounded-bl-none"
                    )}
                >
                    9,9
                </div>
            </div>
        </div>
    )
}