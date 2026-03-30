export default function HotelSummaryCard() {
  return (
    <div className="rounded-2xl border border-gray-300 bg-white p-5">
      <img
        src="/images/property-image.jpg"
        alt="Lakshmi Apartment & Hotel"
        className="h-72 w-full rounded-xl object-cover"
      />

      <div className="mt-5">
        <div className="text-2xl text-yellow-500">★★</div>

        <h2 className="mt-2 text-[2rem] font-bold uppercase leading-tight text-slate-900">
          LAKSHMI APARTMENT & HOTEL
        </h2>

        <p className="mt-4 text-[1.05rem] leading-10 text-slate-800">
          K523/56 Cách Mạng Tháng Tám, p Hoà Thọ Đông, Cẩm Lệ, Đà Nẵng 10, Đà
          Nẵng, Việt Nam
        </p>

        <div className="mt-5 flex items-center gap-3">
          <span className="rounded-md bg-blue-700 px-3 py-1 text-xl font-semibold text-white">
            7.5
          </span>

          <span className="text-xl text-slate-700">
            <span className="font-medium text-slate-900">Tốt</span> · 10 đánh giá
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3 text-[1.05rem] text-slate-800">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-900 text-sm">
            P
          </span>
          <span>Chỗ đỗ xe</span>
        </div>
      </div>
    </div>
  )
}