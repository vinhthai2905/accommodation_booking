import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { usePartnerChildrenPolicy } from '../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerChildrenPolicy'

import { usePartnerChildrenPolicyMutation } from '../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerChildrenPolicyMutations'
import LoadingFullScreen from '../../../../../../book/components/Shared/LoadingFullScreen'

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
                                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors
                                ${errors.max_free_age ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#003b95] focus:ring-blue-100'}`}
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
                                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors
                                ${errors.max_surcharge_age ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#003b95] focus:ring-blue-100'}`}
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
                                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors
                                ${errors.adult_age_from ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#003b95] focus:ring-blue-100'}`}
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
                                className={`w-full px-4 py-2.5 rounded-lg border focus:ring-2 focus:outline-none transition-colors
                                ${errors.surcharge_amount ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:border-[#003b95] focus:ring-blue-100'}`}
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
                            <span className="text-sm text-gray-500 mb-1">Được miễn phí</span>
                            <span className="font-semibold text-gray-900">Từ {policyData.max_free_age} tuổi trở xuống</span>
                        </div>
                        <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-sm text-gray-500 mb-1">Tính phí phụ thu</span>
                            <span className="font-semibold text-gray-900">Từ {parseInt(policyData.max_free_age) + 1} đến {policyData.max_surcharge_age} tuổi</span>
                        </div>
                        <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-sm text-gray-500 mb-1">Tính như người lớn</span>
                            <span className="font-semibold text-gray-900">Từ {policyData.adult_age_from} tuổi trở lên</span>
                        </div>
                        <div className="flex flex-col bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <span className="text-sm text-gray-500 mb-1">Mức phụ thu (Mỗi trẻ/Đêm)</span>
                            <span className="font-bold text-green-600">{Number(policyData.surcharge_amount).toLocaleString('vi-VN')} VND</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
