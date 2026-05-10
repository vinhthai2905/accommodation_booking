import CheckoutFormBorder from "../../../../components/ui/CheckoutFormBorder"

import { useFormContext } from "react-hook-form"

export default function SpecialRequestFields() {
    const { register } = useFormContext()

    return (
        <CheckoutFormBorder>
            <h2 className="text-xl font-bold text-slate-900">Các Yêu Cầu Đặc Biệt</h2>

            <p className="mt-4 text-slate-800">
                Các yêu cầu đặc biệt không đảm bảo sẽ được đáp ứng – tuy nhiên, chỗ nghỉ
                sẽ cố gắng hết sức để thực hiện. Bạn luôn có thể gửi yêu cầu đặc biệt sau
                khi hoàn tất đặt phòng của mình!
            </p>

            <div className="mt-5">
                <label className="mb-2 block text-slate-900">
                    Vui lòng ghi yêu cầu của bạn tại đây.{" "}
                    <span className="text-slate-500">(không bắt buộc)</span>
                </label>

                <textarea
                    {...register("note", {
                    })}
                    rows={4}
                    className="w-full rounded-md border border-gray-400 px-3 py-3 outline-none focus:border-blue-500"
                />
            </div>

        </CheckoutFormBorder>
    )
}