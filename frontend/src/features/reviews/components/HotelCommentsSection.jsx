import { clsx } from "clsx"
import { useFormContext } from "react-hook-form"

export default function HotelCommentsSection() {
    const { register, formState: { errors } } = useFormContext()

    return (
        <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                Chia sẻ thêm về trải nghiệm của bạn (Tùy chọn)
            </label>
            <textarea
                id="comment"
                rows={5}
                placeholder="Khách sạn có sạch sẽ không? Nhân viên có thân thiện không? Vị trí có thuận tiện không?"
                className={clsx(
                    "w-full rounded-xl border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400",
                    "focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-shadow resize-none"
                )}
                {...register("comment", {
                    required: "Vui lòng nhập cảm nghĩ của bạn.",
                    maxLength: { value: 1000, message: "Nhận xét không được vượt quá 1000 ký tự" }
                })}
            />
            {errors.comment && (
                <p className="mt-1.5 text-sm text-red-600">{errors.comment.message}</p>
            )}
        </div>
    )
}