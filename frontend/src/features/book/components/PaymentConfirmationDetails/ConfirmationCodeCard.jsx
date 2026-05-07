import { Copy } from "lucide-react"

import { reduceOrderBooking } from "../../utils/reduceOrderBooking"

import usePaymentConfirmation from "../../../../hooks/payment/usePaymentConfirmation"

export default function ConfirmationCodeCard() {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
    }

    const { booking } = usePaymentConfirmation()

    return (
        <div className="rounded-xl bg-blue-700 text-white p-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-200">Mã xác nhận:</span>
                <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-bold tracking-wide">{reduceOrderBooking(booking.id_booking)}</span>
                    <button
                        type="button"
                        onClick={() => handleCopy("6261194022")}
                        className="text-gray-300 cursor-pointer"
                        aria-label="Sao chép mã xác nhận"
                    >
                        <Copy size={14} />
                    </button>
                </div>
            </div>

            <div className="mt-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-200">Mã PIN:</span>
                <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-bold">{"3727"}</span>
                    <button
                        type="button"
                        onClick={() => handleCopy("3727")}
                        className="text-gray-300 cursor-pointer"
                        aria-label="Sao chép mã PIN"
                    >
                        <Copy size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}