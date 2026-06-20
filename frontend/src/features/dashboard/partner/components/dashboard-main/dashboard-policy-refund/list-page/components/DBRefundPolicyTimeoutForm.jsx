export default function DBRefundPolicyTimeoutForm({register, errors, isCancellationAllowed}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Days Before Arrival Penalty */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Thời hạn hủy miễn phí
                </label>
                <div className="relative">
                    <input
                        type="number"
                        min="0"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors
                                    ${errors.days_before_arrival_penalty ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#003b95] focus:ring-blue-100'}`}
                        placeholder="VD: 5"
                        {...register("days_before_arrival_penalty", {
                            required: isCancellationAllowed ? "Vui lòng nhập thời hạn hủy" : false,
                            min: { value: 0, message: "Số ngày không được âm" }
                        })}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        ngày
                    </div>
                </div>
                {errors.days_before_arrival_penalty && (
                    <p className="mt-1 text-sm text-red-500">{errors.days_before_arrival_penalty.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Số ngày trước khi check-in mà khách có thể hủy không mất phí.</p>
            </div>

            {/* Penalty Percentage */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mức phí phạt
                </label>
                <div className="relative">
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors
                                    ${errors.penalty_percentage ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#003b95] focus:ring-blue-100'}`}
                        placeholder="VD: 10"
                        {...register("penalty_percentage", {
                            required: isCancellationAllowed ? "Vui lòng nhập mức phí phạt" : false,
                            min: { value: 0, message: "Phần trăm không được âm" },
                            max: { value: 100, message: "Phần trăm tối đa là 100" }
                        })}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                        %
                    </div>
                </div>
                {errors.penalty_percentage && (
                    <p className="mt-1 text-sm text-red-500">{errors.penalty_percentage.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">Phần trăm giá trị phòng sẽ bị trừ nếu khách hủy quá thời hạn.</p>
            </div>
        </div>
    )
}