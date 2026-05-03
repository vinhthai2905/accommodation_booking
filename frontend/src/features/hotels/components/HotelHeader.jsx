import { clsx } from "clsx"
import { Link } from "react-router"

import useHotelDetailsContext from "../../../hooks/hotel/useHotelDetailsContext"

export default function HotelHeader() {
    const { hotelQuery } = useHotelDetailsContext()
    const { isLoading, data: hotel, error } = hotelQuery

    return (
        <div
            className={clsx(
                "flex items-start justify-between",
                "gap-4"
            )}
        >
            {/* Left side */}
            <div className="flex flex-col gap-2">
                {/* Title */}
                <h1 className="text-2xl font-bold text-black">
                    {hotel.name}
                </h1>

                {/* Address */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📍</span>
                    <span>
                        {hotel.full_address}
                    </span>
                </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-end gap-2">
                {/* Top actions */}
                <div className="flex items-center gap-3">
                    <button className="text-gray-500 hover:text-black">♡</button>
                    <button className="text-gray-500 hover:text-black">🔗</button>

                    <Link
                        to={"/hotel/checkout"}
                        className={clsx(
                            "rounded-md bg-blue-600 px-4 py-2",
                            "text-sm font-medium text-white",
                            "hover:bg-blue-700"
                        )}
                    >
                        Đặt căn hộ của bạn
                    </Link>
                </div>

                {/* Bottom link */}
                <div className="flex items-center gap-2 text-sm">
                    <span>🏷️</span>
                    <a href="/" className="text-blue-600 hover:underline">
                        Chúng Tôi Luôn Khớp Giá!
                    </a>
                </div>
            </div>
        </div>
    )
}