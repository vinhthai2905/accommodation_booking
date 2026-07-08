import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { usePartnerChildrenPolicy } from '../../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerChildrenPolicy'

import { usePartnerChildrenPolicyMutation } from '../../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerChildrenPolicyMutations'
import LoadingFullScreen from '../../../../../../../book/components/Shared/LoadingFullScreen'
import DashboardChildrenPolicy from '../../../../../pages/DashboardChildrenPolicy'
import DBChildrenPolicySummary from '../components/DBChildrenPolicySummary'
import DBChildrenPolicyForm from '../components/DBChildrenPolicyForm'

export default function DBChildrenPolicy() {
    const { data: policyData, isLoading } = usePartnerChildrenPolicy()
    const updateMutation = usePartnerChildrenPolicyMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            max_free_age: 0,
            max_surcharge_age: 0,
            adult_age_from: 0,
            surcharge_amount: 0
        }
    })

    useEffect(() => {
        if (policyData) {
            reset({
                max_free_age: policyData.max_free_age || 0,
                max_surcharge_age: policyData.max_surcharge_age || 0,
                adult_age_from: policyData.adult_age_from || 0,
                surcharge_amount: policyData.surcharge_amount || 0
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
                <h2 className="text-xl font-bold text-gray-900">Cấu hình chính sách trẻ em</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Thiết lập độ tuổi và mức phụ thu dành cho trẻ em khi lưu trú tại khách sạn
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <DBChildrenPolicyForm register={register} errors={errors}/>

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
               <DBChildrenPolicySummary policyData={policyData}/>
            )}
        </div>
    )
}
