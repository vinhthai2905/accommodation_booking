import useBookingSummary from "../../../hooks/booking/useBookingSummary"

export default function HotelSummaryCard() {
  const { data: hotel } = useBookingSummary()

  return (
    <div className="w-auto text-sm rounded-2xl border border-gray-300 bg-white p-5">
      <img
        src={hotel.primary_image}
        alt="Lakshmi Apartment & Hotel"
        className="w-full rounded-xl object-cover"
      />

      <div className="mt-5">
        <div className="text-yellow-500">★★</div>

        <h2 className="text-lg mt-2 font-bold uppercase leading-tight text-slate-900">
          {hotel.name}
        </h2>

        <p className="mt-4 text-slate-800">
          {hotel.full_address}
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