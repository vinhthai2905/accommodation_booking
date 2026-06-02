import { useState } from "react"
import { useFormContext } from "react-hook-form"
import { clsx } from "clsx"
import { Star } from "lucide-react"

export default function HotelRatingSection() {
    const { register, setValue, watch, formState: { errors } } = useFormContext()
    
    // Watch the form value (default 0) instead of local props
    const hotelRating = watch("hotelRating", 0)
    const [hoverRating, setHoverRating] = useState(0)

    return (
        <div className="mb-8 flex flex-col items-center">
            <label className="block text-base font-medium text-gray-900 mb-4">
                Trải nghiệm của bạn thế nào?
            </label>
            
            <input 
                type="hidden" 
                {...register("hotelRating", { 
                    required: "Vui lòng chọn số sao đánh giá!",
                    min: { value: 1, message: "Vui lòng chọn số sao đánh giá!" } 
                })} 
            />

            <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                        onClick={() => setValue("hotelRating", star, { shouldValidate: true })}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <Star
                            size={40}
                            className={clsx(
                                "transition-colors duration-200",
                                (hoverRating || hotelRating) >= star
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-transparent text-gray-300"
                            )}
                        />
                    </button>
                ))}
            </div>
            
            <div className="h-6 mt-2 text-sm font-medium text-amber-600">
                {hoverRating === 1 || (!hoverRating && hotelRating === 1) ? "Rất tệ" : ""}
                {hoverRating === 2 || (!hoverRating && hotelRating === 2) ? "Tệ" : ""}
                {hoverRating === 3 || (!hoverRating && hotelRating === 3) ? "Bình thường" : ""}
                {hoverRating === 4 || (!hoverRating && hotelRating === 4) ? "Tốt" : ""}
                {hoverRating === 5 || (!hoverRating && hotelRating === 5) ? "Tuyệt vời" : ""}
            </div>
            
            {errors.hotelRating && (
                <p className="mt-2 text-sm text-red-600">{errors.hotelRating.message}</p>
            )}
        </div>
    )
}