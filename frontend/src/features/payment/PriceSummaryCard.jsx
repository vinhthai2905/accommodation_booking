export default function PriceSummaryCard() {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <div className="p-8">
                <h2 className="text-2xl font-bold text-slate-900">Tóm tắt giá</h2>

                <div className="mt-8 space-y-6">
                    <div className="flex items-start justify-between gap-6">
                        <p className="text-[1.05rem] text-slate-900">Giá gốc</p>
                        <p className="text-[1.05rem] text-slate-900">VND 660.000</p>
                    </div>

                    <div className="flex items-start justify-between gap-6">
                        <div className="max-w-[70%]">
                            <p className="text-[1.05rem] text-slate-900">
                                Ưu Đãi Trong Thời Gian Có Hạn
                            </p>

                            <p className="mt-2 text-[1.05rem] leading-8 text-slate-600">
                                Bạn được giảm giá vì chỗ nghỉ này đang có ưu đãi trong thời gian
                                có hạn cho một số phòng khớp với tìm kiếm của bạn.
                            </p>
                        </div>

                        <p className="whitespace-nowrap text-[1.05rem] text-slate-900">
                            - VND 264.000
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 px-8 py-10">
                <div className="flex items-end justify-between gap-6">
                    <h3 className="text-5xl font-bold leading-none text-slate-900">
                        Tổng cộng
                    </h3>

                    <div className="text-right">
                        <p className="text-[1.05rem] text-red-500 line-through">
                            VND 660.000
                        </p>

                        <p className="mt-2 text-5xl font-bold leading-none text-slate-900">
                            VND 396.000
                        </p>

                        <p className="mt-4 text-[1.05rem] text-slate-600">
                            Đã bao gồm thuế và phí
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8">
                <h3 className="text-2xl font-bold text-slate-900">Thông tin giá</h3>

                <div className="mt-8 flex items-start gap-4">
                    <div className="mt-1 text-3xl text-slate-700">₫</div>

                    <div className="w-full">
                        <p className="text-[1.05rem] text-slate-900">
                            Bao gồm VND 29.333 phí và thuế
                        </p>

                        <div className="mt-6 flex items-center justify-between gap-6 text-slate-600">
                            <p className="text-[1.05rem]">8 % Thuế GTGT</p>
                            <p className="text-[1.05rem]">VND 29.333</p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-8 text-[1.05rem] font-medium text-blue-600"
                >
                    Ẩn chi tiết
                </button>
            </div>
        </div>
    )
}