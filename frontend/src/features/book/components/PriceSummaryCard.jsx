export default function PriceSummaryCard({ totalRoomPrice }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white">
            <div className="p-5">
                <h2 className="text-lg font-bold text-slate-900">Tóm tắt giá</h2>
            </div>

            <div className="bg-blue-50 p-5">
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-bold leading-none text-slate-900">
                        Tổng cộng
                    </h3>

                    <div>
                        <p className="mt-2 font-bold leading-none text-slate-900">
                            Giá phòng: {Intl.NumberFormat("vi-VN").format(totalRoomPrice)} VND
                        </p>

                        <p className="mt-2 text-slate-600">
                            Đã bao gồm thuế và phí
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-5">
                <h3 className="text-lg font-bold text-slate-900">Thông tin giá</h3>

                <div className="mt-2 flex items-start gap-4">
                    <div className="text-slate-700">₫</div>

                    <div className="w-full">
                        <p className="text-slate-900">
                            Bao gồm VND 29.333 phí và thuế
                        </p>

                        <div className="mt-2 flex gap-3 text-slate-600">
                            <p className="w-fit">8 % Thuế GTGT</p>
                            <p className="w-fit">VND 29.333</p>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="mt-2 self-end font-medium text-blue-600"
                >
                    Ẩn chi tiết
                </button>
            </div>
        </div>
    )
}