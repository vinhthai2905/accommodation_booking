import { CircleCheck } from "lucide-react"

import CheckoutFormBorder from "../../components/ui/CheckoutFormBorder"

export default function CheckinInfoForm() {
  return (
    <CheckoutFormBorder>
      <h2 className="text-xl font-bold text-slate-900">Thông tin nhận phòng</h2>

      <div className="mt-5 flex items-center gap-3">
        <CircleCheck className="h-6 w-6 text-green-600" />
        <p className="text-slate-900">
          Bạn có thể nhận chỗ nghỉ trong khoảng từ 14:00 đến 00:00
        </p>
      </div>

      <div className="mt-5 max-w-85">
        <label className="mb-2 blocktext-slate-900">
          Thêm thời gian đến dự kiến của bạn{" "}
          <span className="text-slate-500">(không bắt buộc)</span>
        </label>

        <select className="mt-3 w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-blue-500">
          <option>Vui lòng chọn</option>
          <option>14:00 - 15:00</option>
          <option>15:00 - 16:00</option>
          <option>16:00 - 17:00</option>
          <option>17:00 - 18:00</option>
          <option>18:00 - 19:00</option>
          <option>19:00 - 20:00</option>
          <option>20:00 - 21:00</option>
          <option>21:00 - 22:00</option>
          <option>22:00 - 23:00</option>
          <option>23:00 - 00:00</option>
        </select>
      </div>
    </CheckoutFormBorder>
  )
}