import CheckoutFormBorder from "../../components/ui/CheckoutFormBorder"

export default function SelectedRoomCard() {
    return (
        <CheckoutFormBorder>
            <h3 className="text-xl font-bold leading-tight text-slate-900">
                Suite Có Giường Cỡ King
            </h3>

            <div className="mt-3 space-y-2">
                <div className="flex items-center gap-3">
                    <span className="text-slate-800">😢</span>
                    <span className="font-semibold text-slate-900">
                        Hoàn tiền một phần
                    </span>
                    <button
                        type="button"
                        className="text-sm font-medium text-blue-600"
                        aria-label="Thông tin hoàn tiền một phần"
                    >
                        ?
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-slate-800">👥</span>
                    <span className="font-semibold text-slate-900">
                        Khách: 2 người lớn
                    </span>
                    <button
                        type="button"
                        className="text-sm font-medium text-blue-600"
                        aria-label="Thông tin số lượng khách"
                    >
                        ?
                    </button>
                </div>
            </div>

            <div className="mt-2 space-y-2 text-slate-600">
                <div className="flex items-center gap-3">
                    <span>✨</span>
                    <span>Căn hộ sạch bong · 9.6</span>
                </div>

                <div className="flex items-center gap-3">
                    <span>🚭</span>
                    <span>Không hút thuốc</span>
                </div>
            </div>
        </CheckoutFormBorder>
    )
}