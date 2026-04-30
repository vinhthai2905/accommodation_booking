import { clsx } from "clsx"

import { Link, useLocation } from "react-router"

export default function HotelCardSearchResultItem({ hotel }) {
    const location = useLocation()

    return (
        <div
            identity="hotel-card-search-result-item"
            className={clsx(
                "w-full overflow-hidden rounded-lg",
                "flex flex-col",
                "border border-gray-300 bg-white"
            )}>

            {/* Image */}
            <div className="relative flex-1">
                <Link to="/hotel">
                    <img
                        src={hotel.primary_image}
                        alt="Hotel room"
                        className="h-full object-cover"
                    />
                </Link>

                <button
                    type="button"
                    className={clsx(
                        "absolute right-3 top-3",
                        "flex h-11 w-11 items-center justify-center",
                        "rounded-full bg-white shadow-sm"
                    )}
                    aria-label="Save property"
                >
                    <span className="text-xl text-gray-500">♡</span>
                </button>
            </div>

            {/* Content */}

            <div className="p-3 flex flex-col justify-between flex-2 gap-5">
                <div>
                    <h2 className={clsx(
                        "text-md font-bold",
                        "text-blue-700"
                    )}>
                        {hotel.name}
                    </h2>

                    <div className={clsx(
                        "mt-2 inline-block",
                        "rounded-sm bg-yellow-400 px-2 py-1",
                        "text-xs text-black"
                    )}>

                        New on Booking.com
                    </div>

                    <div className={clsx(
                        "mt-3 text-sm",
                        "text-blue-700 underline"
                    )}>
                        <a href="/">{hotel.full_address}</a>
                        <span className="mx-2 text-gray-500 no-underline">·</span>
                        <a href="/">View on the map</a>
                    </div>

                    <p className="mt-1 text-sm text-gray-600">
                        2.3km from the center
                    </p>

                    <p className="mt-3 text-sm text-black">
                        The Rixx Everich 2 beds 2 bath at Chinatown with pool and gym and Netflix is a property located in the city. Ho Chi Minh and have its own swimming pool.
                    </p>
                </div>

                <div className="flex justify-end">
                    <Link
                        to={`/hotel/${hotel.slug}/${hotel.id_hotel}${location.search}`}
                        className={clsx(
                            "rounded-sm bg-blue-600 px-4 py-2",
                            "text-sm font-medium text-white",
                            "hover:bg-blue-700 cursor-pointer"
                        )}
                    >
                        Xem khách sạn
                    </Link>
                </div>
            </div>
        </div>
    )
}