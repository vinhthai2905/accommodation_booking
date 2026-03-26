import { clsx } from "clsx"

export default function PartnerRegisterCard() {
    return (
        <div className={clsx(
            "w-105",
            "rounded-md border-[5px] border-[#febb02]",
            "bg-white",
            "overflow-hidden"
        )}>
            <div className={clsx(
                "px-6 py-6"
            )}>
                <h2 className={clsx(
                    "text-[#1a1a1a] font-bold",
                    "text-[24px]"
                )}>
                    Đăng ký miễn phí
                </h2>

                <div className={clsx(
                    "mt-6",
                    "space-y-5"
                )}>
                    <div className={clsx(
                        "flex items-start",
                        "gap-4"
                    )}>
                        <span className="text-green-600 text-xl">✓</span>
                        <p className={clsx(
                            "text-sm text-[#1a1a1a]"
                        )}>
                            45% host nhận được đơn đặt đầu tiên trong vòng 1 tuần
                        </p>
                    </div>

                    <div className={clsx(
                        "flex items-start",
                        "gap-4"
                    )}>
                        <span className="text-green-600 text-xl">✓</span>
                        <p className={clsx(
                            "text-sm text-[#1a1a1a]"
                        )}>
                            Tùy chọn: nhận đơn tức thì hoặc khách gửi yêu cầu đặt
                            phòng
                        </p>
                    </div>

                    <div className={clsx(
                        "flex items-start",
                        "gap-4"
                    )}>
                        <span className="text-green-600 text-xl">✓</span>
                        <p className={clsx(
                            "text-sm text-[#1a1a1a]"
                        )}>
                            Chúng tôi sẽ hỗ trợ xử lý thanh toán cho Quý vị
                        </p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300"></div>

            <div className={clsx(
                "px-6 py-4"
            )}>
                <button className={clsx(
                    "w-full h-12",
                    "rounded bg-[#0071c2]",
                    "text-white text-[20px] font-medium",
                    "hover:cursor-pointer"
                )}>
                    Bắt đầu ngay →
                </button>
            </div>

            <div className="border-t border-gray-300"></div>

            <div className={clsx(
                "px-6 py-5"
            )}>
                <p className={clsx(
                    "font-bold text-sm text-[#1a1a1a]"
                )}>
                    Quý vị đã bắt đầu quá trình đăng ký?
                </p>

                <a href="#" className={clsx(
                    "mt-2 inline-block",
                    "text-[#0071c2] text-sm",
                    "hover:underline"
                )}>
                    Tiếp tục các bước đăng ký
                </a>
            </div>
        </div>
    )
}