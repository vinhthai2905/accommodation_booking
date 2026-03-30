export default function GuestFormHeader() {
    return (
        <div>
            <h2 className="text-xl font-bold text-slate-900">
                Nhập thông tin chi tiết của bạn
            </h2>

            <div className="mt-6 rounded-md border border-gray-500 px-4 py-4">
                <div className="flex items-start gap-3">
                    <div className="mt-1 text-slate-700">ⓘ</div>

                    <div className="space-y-2">
                        <p className="text-slate-900">
                            Gần xong rồi! Chỉ cần điền phần thông tin{" "}
                            <span className="text-red-500">*</span> bắt buộc
                        </p>

                        <p className="text-slate-900">
                            Vui lòng nhập thông tin của bạn bằng ký tự Latin để chỗ nghỉ có
                            thể hiểu được
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}