import CheckoutFormBorder from "../../../../components/ui/CheckoutFormBorder"
import ErrorValidation from "../../../../components/ui/ErrorValidation"

import { CircleCheck } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { clsx } from "clsx"
import { getFieldBorderClass } from "../../../../utils/getFieldErrorBorder"

const checkInTimeOptions = [
  { label: "14:00 - 15:00", value: "14:00" },
  { label: "15:00 - 16:00", value: "15:00" },
  { label: "16:00 - 17:00", value: "16:00" },
  { label: "17:00 - 18:00", value: "17:00" },
  { label: "18:00 - 19:00", value: "18:00" },
  { label: "19:00 - 20:00", value: "19:00" },
  { label: "20:00 - 21:00", value: "20:00" },
  { label: "21:00 - 22:00", value: "21:00" },
  { label: "22:00 - 23:00", value: "22:00" },
  { label: "23:00 - 00:00", value: "23:00" },
]

export default function CheckinInfoFields() {
  const { register, formState: { errors } } = useFormContext()

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
        </label>

        <select
          {...register("checkInTime", {
            required: "Vui lòng chọn thời gian dự kiến."
          })}
          className={clsx(
            "mt-3 w-full rounded-md border",
            "border-gray-400 px-3 py-2 outline-none focus:border-blue-500",
            getFieldBorderClass(errors?.checkInTime)
          )}>
          <option key={-1} value="">
            Vui lòng chọn
          </option>
          {checkInTimeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {errors?.checkInTime && (
          <ErrorValidation message={errors.checkInTime.message} />
        )}
      </div>
    </CheckoutFormBorder >
  )
}