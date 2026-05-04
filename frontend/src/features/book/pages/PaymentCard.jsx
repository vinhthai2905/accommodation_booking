import { clsx } from "clsx"
import { CreditCard, CheckCircle2, ArrowRight, Loader2 } from "lucide-react"
import { useState } from "react"
import CheckoutFormBorder from "../../../components/ui/CheckoutFormBorder"

const METHODS = [
    {
        value: "card",
        label: "Thẻ tín dụng / ghi nợ",
        sublabel: "Visa, Mastercard, JCB, AMEX…",
        color: "#2563EB",
        img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/alepay.png"
    },
    {
        value: "momo",
        label: "Ví MoMo",
        sublabel: "Thanh toán qua ứng dụng MoMo",
        color: "#AE2070",
        steps: [
            "Mở ứng dụng MoMo → Quét mã hoặc Chuyển tiền.",
            "Nhập số tiền và ghi chú mã đặt phòng.",
            "Xác nhận bằng PIN hoặc vân tay.",
        ],
        img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/momo.png"
    },
    {
        value: "zalopay",
        label: "Ví ZaloPay",
        sublabel: "Thanh toán qua ứng dụng ZaloPay",
        color: "#0068FF",
        steps: [
            "Mở ứng dụng ZaloPay → Quét mã QR hoặc Chuyển tiền.",
            "Nhập số tiền và ghi rõ mã đặt phòng.",
            "Xác nhận giao dịch bằng PIN hoặc sinh trắc học.",
        ],
        img: "https://cdn2.fptshop.com.vn/public-logo/unsafe/96x0/filters:format(webp):quality(75)/payment/payment/zalopay.png"
    },
]

export default function PaymentCard({ bookingFormPayload, createBookingMutation }) {
    const [cardSelected, setCardSelected] = useState("card")
    const method = METHODS.find((m) => m.value === cardSelected)

    const handleConfirmBooking = () => {
        if (!bookingFormPayload) return
        createBookingMutation.mutate({ ...bookingFormPayload, payment_method: cardSelected })
    }

    return (
        <CheckoutFormBorder>
            <h2 className="text-xl font-bold text-slate-900">
                Phương thức thanh toán
            </h2>

            <div className="mt-4 flex flex-col gap-2">
                {METHODS.map((m) => (
                    <button
                        key={m.value}
                        type="button"
                        onClick={() => setCardSelected(m.value)}
                        className={clsx(
                            "flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all",
                            cardSelected === m.value
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        )}
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                            <img src={m.img} />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-slate-800">{m.label}</p>
                            <p className="text-xs text-slate-500">{m.sublabel}</p>
                        </div>
                        <CheckCircle2
                            className={clsx(
                                "h-5 w-5 shrink-0 transition-opacity",
                                cardSelected === m.value ? "text-blue-500" : "opacity-0"
                            )}
                        />
                    </button>
                ))}
            </div>

            {/* Wallet steps */}
            {method.steps && (
                <ol
                    className="mt-5 space-y-2 rounded-xl border-2 p-4 text-sm"
                    style={{ borderColor: method.color + "40", backgroundColor: method.color + "08" }}
                >
                    {method.steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-700">
                            <span
                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                                style={{ backgroundColor: method.color }}
                            >
                                {i + 1}
                            </span>
                            {step}
                        </li>
                    ))}
                </ol>
            )}

            <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={createBookingMutation?.isPending || !bookingFormPayload}
                style={{ backgroundColor: method.color }}
                className={clsx(
                    "mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3",
                    "text-sm font-semibold text-white transition-all",
                    "hover:opacity-90 active:scale-[0.98]",
                    "disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                )}
            >
                {createBookingMutation?.isPending 
                    ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Đang xử lý…
                    </>
                ) 
                    : (
                    <>
                        Xác nhận thanh toán <ArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </CheckoutFormBorder>
    )
}
