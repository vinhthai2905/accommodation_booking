import { Smartphone } from "lucide-react"

export default function ManageWithAppCard() {
    return (
        <div className="mt-4 rounded-xl border border-gray-200 bg-white overflow-hidden">
            <div className="p-4 flex gap-4">
                {/* Text content */}
                <div className="flex-1">
                    <h3 className="font-bold text-slate-900 text-base leading-tight">
                        Quản lý chuyến đi với ứng dụng
                    </h3>

                    <ul className="mt-3 space-y-2">
                        {[
                            "Chỉnh sửa đơn đặt trên từng cây số",
                            "Xem xác nhận ngoại tuyến",
                            "Nhận tin cho chỗ nghỉ bất kỳ lúc nào",
                        ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="text-green-500 shrink-0 mt-0.5">✓</span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <button
                        type="button"
                        className="mt-4 px-5 py-2 border-2 border-blue-600 text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Tải ứng dụng
                    </button>
                </div>

                {/* Phone illustration */}
                <div className="shrink-0 w-20 flex items-center justify-center">
                    <div className="relative">
                        <div className="w-14 h-24 rounded-xl bg-linear-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg">
                            <Smartphone size={28} className="text-white" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow">
                            <span className="text-xs font-bold text-yellow-900">★</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}