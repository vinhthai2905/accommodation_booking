import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { usePartnerRefundPolicy } from '../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerRefundPolicy'
import { usePartnerRefundPolicyMutation } from '../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerRefundPolicyMutations'
import LoadingFullScreen from '../../../../../../book/components/Shared/LoadingFullScreen'

export default function DBRefundPolicy() {
    const { data: policyData, isLoading } = usePartnerRefundPolicy()
    const updateMutation = usePartnerRefundPolicyMutation()

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            is_cancellation_allowed: true,
            days_before_arrival_penalty: 1,
            penalty_percentage: 10
        }
    })

    const isCancellationAllowed = watch('is_cancellation_allowed')

    useEffect(() => {
        if (policyData) {
            reset({
                is_cancellation_allowed: policyData.is_cancellation_allowed ?? true,
                days_before_arrival_penalty: policyData.days_before_arrival_penalty || 1,
                penalty_percentage: policyData.penalty_percentage || 10
            })
        }
    }, [policyData, reset])

    const onSubmit = (data) => {
        updateMutation.mutate(data)
    }

    if (isLoading) return <LoadingFullScreen />

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Cấu hình chính sách hoàn tiền</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Thiết lập các điều kiện hủy phòng và phí phạt đối với khách hàng
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">Cho phép hủy phòng</h3>
                            <p className="text-sm text-gray-500 mt-1">Bật tính năng này nếu bạn muốn cho phép khách hàng hủy phòng sau khi đã đặt.</p>
                        </div>
                        <Controller
                            name="is_cancellation_allowed"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer"
                                        checked={value}
                                        onChange={(e) => onChange(e.target.checked)}
                                    />
                                    <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#003b95]"></div>
                                </label>
                            )}
                        />
                    </div>
                </div>

                {isCancellationAllowed && (
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
                )}

                <div className="pt-6 border-t border-gray-200 flex justify-end">
                    <button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="px-6 py-2.5 bg-[#003b95] text-white font-medium rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updateMutation.isPending ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </form>

            {/* Current Policy Summary */}
            {policyData && (
                <div className="mt-2 mx-6 mb-6 p-6 bg-blue-50 border border-blue-100 rounded-xl">
                    <h3 className="text-lg font-semibold text-[#003b95] mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Chính sách hiện tại đang áp dụng
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-sm text-gray-500 mb-1">Cho phép hủy phòng</span>
                            <span className={`font-semibold ${policyData.is_cancellation_allowed ? 'text-green-600' : 'text-red-600'}`}>
                                {policyData.is_cancellation_allowed ? 'Có' : 'Không'}
                            </span>
                        </div>
                        
                        {policyData.is_cancellation_allowed && (
                            <>
                                <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <span className="text-sm text-gray-500 mb-1">Miễn phí hủy</span>
                                    <span className="font-semibold text-gray-900">
                                        Trước {policyData.days_before_arrival_penalty} ngày so với ngày nhận phòng
                                    </span>
                                </div>
                                <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <span className="text-sm text-gray-500 mb-1">Thời hạn tính phí</span>
                                    <span className="font-semibold text-gray-900">
                                        Trong vòng {policyData.days_before_arrival_penalty} ngày trước nhận phòng
                                    </span>
                                </div>
                                <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <span className="text-sm text-gray-500 mb-1">Phí phạt hủy muộn</span>
                                    <span className="font-bold text-red-600">
                                        {Number(policyData.penalty_percentage).toString()}% giá trị tiền phòng
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
