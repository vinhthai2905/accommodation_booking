import SecurityBanner from "../components/PaymentConfirmationDetails/SecurityBanner"
import BookingSummaryCard from "../components/PaymentConfirmationDetails/BookingSummaryCard"
import DirectionCard from "../components/PaymentConfirmationDetails/DirectionCard"

import { clsx } from "clsx"
import { Download, Printer } from "lucide-react"

import usePaymentConfirmation from "../../../hooks/payment/usePaymentConfirmation"

export default function ConfirmationMain() {
    const {
        booking,
    } = usePaymentConfirmation()

    return (
        <div className="flex-1 min-w-0">
            <div>
                <p className="mb-1 text-sm font-semibold text-green-500">
                    Đã xác nhận
                </p>

                <h1 className="text-2xl font-bold leading-snug text-slate-900">
                    Đặt phòng của bạn ở Đà Nẵng đã được xác nhận.
                </h1>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <span className="text-green-500">✓</span>
                    <span>
                        Xác nhận đang được gửi tới{" "}
                    </span>

                    <button
                        type="button"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Sửa
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                    <button
                        type="button"
                        className={clsx(
                            "flex items-center",
                            "px-4 py-2.5",
                            "gap-2",
                            "text-sm font-semibold text-blue-600",
                            "border-2 border-blue-600",
                            "rounded-lg",
                            "hover:bg-blue-50",
                            "transition-colors",
                        )}
                    >
                        <Printer size={16} />
                        In xác nhận đầy đủ
                    </button>

                    <button
                        type="button"
                        className={clsx(
                            "flex items-center",
                            "px-4 py-2.5",
                            "gap-2",
                            "text-sm font-semibold text-blue-600",
                            "border-2 border-blue-600",
                            "rounded-lg",
                            "hover:bg-blue-50",
                            "transition-colors",
                        )}
                    >
                        <Download size={16} />
                        Lưu xác nhận vào điện thoại
                    </button>
                </div>
            </div>

            <div className="mt-5">
                <SecurityBanner />
            </div>

            <BookingSummaryCard booking={booking} />
            <DirectionCard booking={booking} />
        </div>
    )
}
