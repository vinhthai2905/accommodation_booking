import { ChevronRight, Tag } from "lucide-react"

import { clsx } from "clsx"

export default function CheckoutAction() {
  return (
    <div className="flex justify-end gap-4">
      <div className="flex flex-col items-end gap-4">
        <button
          type="submit"
          className={clsx(
            "inline-flex items-center gap-3 rounded-md",
            "bg-blue-600 px-6 py-3 font-semibold text-white",
            "hover:bg-blue-700 cursor-pointer"
          )}
        >
          <span>Tiếp theo: Chi tiết cuối cùng</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}