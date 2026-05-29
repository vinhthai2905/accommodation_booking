import L from "leaflet"
import "leaflet/dist/leaflet.css"
import "../css/search-map.css"

export default function HotelMarkerIcon({ price, isSelectedHotel }) {
    const formattedPrice = price && price > 0
        ? `VND ${price.toLocaleString('vi-VN')}`
        : "Xem giá"

    const bgClass = isSelectedHotel
        ? "bg-amber-600 after:border-t-amber-600"
        : "bg-[#003b95] after:border-t-[#003b95]"

    const pingElement = isSelectedHotel
        ? `<div class="absolute inset-0 bg-amber-600 rounded animate-ping opacity-75 -z-10"></div>`
        : ""

    return L.divIcon({
        className: `custom-price-marker ${isSelectedHotel ? "selected-marker" : ""}`,
        html: (
            `<div class="${bgClass} text-white px-2 py-1 
                rounded text-xs font-bold 
                shadow-md relative after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 
                after:border-4 after:border-x-transparent after:border-b-transparent"
            >
                ${pingElement}
                ${formattedPrice}
            </div>`
        ),
        iconSize: [100, 30],
        iconAnchor: [50, 30]
    })
}
