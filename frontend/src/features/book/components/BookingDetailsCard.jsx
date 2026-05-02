export default function BookingDetailsCard({ selectedRooms, checkInDate, checkOutDate }) {
  return (
    <div className="text-sm rounded-2xl border border-gray-300 bg-white p-5">
      <h2 className="text-lg font-bold text-slate-900">
        Chi tiết đặt phòng của bạn
      </h2>

      <div className="mt-3 grid grid-cols-2">
        <div className="pr-6">
          <p className="text-slate-900">Nhận phòng</p>
          <p className="mt-3 font-bold leading-tight text-slate-900">
            {checkInDate}
          </p>
          <p className="mt-2 text-slate-600">14:00 – 23:30</p>
        </div>

        <div className="border-l border-gray-300 pl-6">
          <p className="text-slate-900">Trả phòng</p>
          <p className="mt-3 font-bold leading-tight text-slate-900">
            {checkOutDate}
          </p>
          <p className="mt-2 text-slate-600">06:00 – 12:00</p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3 text-green-700">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-4 border-green-700 text-2xl">
          ✓
        </span>
        <p>Có thể trả phòng vào buổi trưa</p>
      </div>

      <div className="mt-5 border-t border-gray-300 pt-4">
        <p className="text-slate-900">Bạn đã chọn</p>

        <p className="font-bold text-slate-900 mb-2">
          {Object.entries(selectedRooms).length} phòng
        </p>

        <ul>
          {Object.entries(selectedRooms).map(room => {
            return (
              <p key={room[0]} className="text-slate-900 mb-1">
                {room[1].roomName}
              </p>
            )
          })}
        </ul>

        <button
          type="button"
          className="mt-3 font-medium text-blue-600"
        >
          Đổi lựa chọn của bạn
        </button>
      </div>
    </div>
  )
}