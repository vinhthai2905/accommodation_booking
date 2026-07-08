export default function DBRefundPolicySummary({ policyData }) {
    return (
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
    )
}