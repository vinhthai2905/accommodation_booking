const getInputClassName = (hasError) =>
    `w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${hasError
        ? 'border-red-500 focus:ring-red-200'
        : 'border-gray-300 focus:border-[#003b95] focus:ring-blue-100'
    }`


export default function DBChildrenPolicyForm({ register, errors }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Max Free Age */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuổi tối đa miễn phí
                </label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className={getInputClassName(errors.max_free_age)}
                        placeholder="VD: 5"
                        {...register("max_free_age", {
                            required: "Vui lòng nhập tuổi tối đa được miễn phí",
                            min: { value: 0, message: "Tuổi không được âm" }
                        })}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        tuổi
                    </div>
                </div>
                {errors.max_free_age && (
                    <p className="mt-1 text-sm text-red-500">{errors.max_free_age.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Trẻ em có độ tuổi nhỏ hơn hoặc bằng độ tuổi này sẽ được miễn phí.</p>
            </div>

            {/* Max Surcharge Age */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuổi tối đa bị phụ thu
                </label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className={getInputClassName(errors.max_surcharge_age)}
                        placeholder="VD: 11"
                        {...register("max_surcharge_age", {
                            required: "Vui lòng nhập tuổi tối đa bị phụ thu",
                            min: { value: 0, message: "Tuổi không được âm" }
                        })}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        tuổi
                    </div>
                </div>
                {errors.max_surcharge_age && (
                    <p className="mt-1 text-sm text-red-500">{errors.max_surcharge_age.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Trẻ em trong khoảng tuổi này sẽ bị tính phí phụ thu trẻ em.</p>
            </div>

            {/* Adult Age From */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tuổi bắt đầu tính như người lớn
                </label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className={getInputClassName(errors.adult_age_from)}
                        placeholder="VD: 12"
                        {...register("adult_age_from", {
                            required: "Vui lòng nhập độ tuổi tính như người lớn",
                            min: { value: 0, message: "Tuổi không được âm" }
                        })}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        tuổi
                    </div>
                </div>
                {errors.adult_age_from && (
                    <p className="mt-1 text-sm text-red-500">{errors.adult_age_from.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Từ độ tuổi này trở lên sẽ tính phí như một người lớn bình thường.</p>
            </div>

            {/* Surcharge Amount */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số tiền phụ thu (VND)
                </label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className={getInputClassName(errors.surcharge_amount)}
                        placeholder="VD: 200000"
                        {...register("surcharge_amount", {
                            required: "Vui lòng nhập số tiền phụ thu",
                            min: { value: 0, message: "Số tiền không được âm" }
                        })}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        VND
                    </div>
                </div>
                {errors.surcharge_amount && (
                    <p className="mt-1 text-sm text-red-500">{errors.surcharge_amount.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Số tiền thu thêm mỗi đêm cho mỗi trẻ em nằm trong độ tuổi phụ thu.</p>
            </div>
        </div>
    )
}