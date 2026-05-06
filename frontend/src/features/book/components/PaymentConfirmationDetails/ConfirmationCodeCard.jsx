import { Copy } from "lucide-react"

export default function ConfirmationCodeCard({ confirmationCode, pin }) {
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
    }

    return (
        <div className="rounded-xl bg-blue-700 text-white p-4">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-200">Mã xác nhận:</span>
                <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-bold tracking-wide">{confirmationCode || "6261194022"}</span>
                    <button
                        type="button"
                        onClick={() => handleCopy(confirmationCode || "6261194022")}
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
                    <span className="text-gray-300 font-bold">{pin || "3727"}</span>
                    <button
                        type="button"
                        onClick={() => handleCopy(pin || "3727")}
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