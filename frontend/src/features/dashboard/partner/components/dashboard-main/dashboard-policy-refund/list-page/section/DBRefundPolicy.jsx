import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { usePartnerRefundPolicy } from '../../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerRefundPolicy'
import { usePartnerRefundPolicyMutation } from '../../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerRefundPolicyMutations'
import LoadingFullScreen from '../../../../../../../book/components/Shared/LoadingFullScreen'
import DBRefundPolicySummary from '../components/DBRefundPolicySummary'
import DBRefundPolicyTimeoutForm from '../components/DBRefundPolicyTimeoutForm'

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
                    <DBRefundPolicyTimeoutForm register={register} errors={errors} isCancellationAllowed={isCancellationAllowed}/>
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
                <DBRefundPolicySummary policyData={policyData}/>
            )}
        </div>
    )
}
