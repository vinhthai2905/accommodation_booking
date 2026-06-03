import { AlertCircle } from "lucide-react"

export default function RejectionAlert({ registration }) {
    if (!registration || registration.status !== "Từ chối") return null

    return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex gap-3 text-red-800 text-sm text-left">
            <AlertCircle className="text-red-600 shrink-0" size={20} />
            <div>
                <h4 className="font-bold mb-1">Yêu cầu đăng ký trước đó bị từ chối</h4>
                <p className="text-red-700 mb-2 leading-relaxed">
                    Lý do: <strong>{registration.reject_reason || "Thông tin cung cấp không chính xác."}</strong>
                </p>
                <p className="text-xs text-red-600">
                    Vui lòng điều chỉnh lại thông tin sai lệch dưới đây và gửi lại yêu cầu đăng ký mới.
                </p>
            </div>
        </div>
    )
}
