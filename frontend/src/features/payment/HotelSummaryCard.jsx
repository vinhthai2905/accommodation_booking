export default function HotelSummaryCard() {
  return (
    <div className="w-auto text-sm rounded-2xl border border-gray-300 bg-white p-5">
      <img
        src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
        alt="Lakshmi Apartment & Hotel"
        className="w-full rounded-xl object-cover"
      />

      <div className="mt-5">
        <div className="text-yellow-500">★★</div>

        <h2 className="text-lg mt-2 font-bold uppercase leading-tight text-slate-900">
          LAKSHMI APARTMENT & HOTEL
        </h2>

        <p className="mt-4 text-slate-800">
          K523/56 Cách Mạng Tháng Tám, p Hoà Thọ Đông, Cẩm Lệ, Đà Nẵng 10, Đà
          Nẵng, Việt Nam
        </p>

        <div className="mt-3 flex items-center gap-3">
          <span className="rounded-md bg-blue-700 px-3 py-1 font-semibold text-white">
            7.5
          </span>

          <span className="text-slate-700">
            <span className="font-medium text-slate-900">Tốt</span> · 10 đánh giá
          </span>
        </div>

      </div>
    </div>
  )
}