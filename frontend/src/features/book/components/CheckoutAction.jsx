import { ChevronRight, Tag } from "lucide-react"

export default function CheckoutAction() {
  return (
    <div className="flex justify-end gap-4">
      <div className="flex flex-col items-end gap-4">
        <button
          type="button"
          className="inline-flex items-center gap-3 rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <span>Tiếp theo: Chi tiết cuối cùng</span>
          <ChevronRight className="h-4 w-4" />
        </button>

        <button
          type="button"
          className="font-medium text-blue-600"
        >
          Các điều kiện đặt phòng là gì?
        </button>
      </div>
    </div>
  )
}