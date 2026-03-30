export default function BookingDetailsCard() {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-5">
      <h2 className="text-[2rem] font-bold text-slate-900">
        Chi tiết đặt phòng của bạn
      </h2>

      <div className="mt-8 grid grid-cols-2">
        <div className="pr-6">
          <p className="text-[1.1rem] text-slate-900">Nhận phòng</p>
          <p className="mt-3 text-[1.15rem] font-bold leading-tight text-slate-900">
            T3, 21 tháng 4
          </p>
          <p className="mt-2 text-[1.15rem] font-bold text-slate-900">2026</p>
          <p className="mt-2 text-[1.05rem] text-slate-600">14:00 – 23:30</p>
        </div>

        <div className="border-l border-gray-300 pl-6">
          <p className="text-[1.1rem] text-slate-900">Trả phòng</p>
          <p className="mt-3 text-[1.15rem] font-bold leading-tight text-slate-900">
            T4, 22 tháng 4
          </p>
          <p className="mt-2 text-[1.15rem] font-bold text-slate-900">2026</p>
          <p className="mt-2 text-[1.05rem] text-slate-600">06:00 – 12:00</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 text-green-700">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-green-700 text-2xl">
          ✓
        </span>
        <p className="text-[1.1rem]">Có thể trả phòng vào buổi trưa</p>
      </div>

      <div className="mt-8 border-t border-gray-300 pt-8">
        <p className="text-[1.1rem] text-slate-900">Bạn đã chọn</p>

        <p className="mt-4 text-[1.2rem] font-bold text-slate-900">
          1 đêm, 1 phòng cho 2 người lớn
        </p>

        <p className="mt-8 text-[1.1rem] text-slate-900">
          1 x Phòng Giường Đôi Hạng Tiết Kiệm
        </p>

        <button
          type="button"
          className="mt-8 text-[1.1rem] font-medium text-blue-600"
        >
          Đổi lựa chọn của bạn
        </button>
      </div>
    </div>
  )
}