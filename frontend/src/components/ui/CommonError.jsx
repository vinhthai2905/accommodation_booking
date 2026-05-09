import { translateServerError } from "../../helpers/common/SERVER_ERROR_TRANSLATIONS"

export default function CommonError({ error }) {
  if (!error) return null

  const message =
    typeof error === "string"
      ? translateServerError(error)
      : error?.message || "Đã có lỗi xảy ra. Vui lòng thử lại."

  return (
    <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      {message}
    </div>
  )
}