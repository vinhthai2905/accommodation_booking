export default function DBChildrenPolicySummary({ policyData }) {
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
    )
}