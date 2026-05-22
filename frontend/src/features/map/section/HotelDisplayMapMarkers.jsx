import HotelDisplayMapCardMarker from "../components/HotelDisplayMapCardMarker"
import MapBoundsWatcher from "../components/MapBoundsWatcher"

import HotelMarkerIcon from "../ui/HotelMarkerIcon"

import { clsx } from "clsx"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Hotel, List as ListIcon } from "lucide-react"

import "leaflet/dist/leaflet.css"
import "../css/search-map.css"

export default function HotelDisplayMapMarkers({
    hotelListMap = [],
    nightsStayin,
    selectedHotel,
    setSelectedHotel,
    handleMapViewPortChange,
    onClose,
}) {
    const DA_NANG_CENTER = [16.0544, 108.2022]
    const DA_NANG_ZOOM = 13

    return (
        <div className={clsx(
            "relative z-0 h-full flex-1",
            "hidden md:block"
        )}>
            <button onClick={onClose} className={clsx(
                "absolute z-1000 right-3 top-3",
                "flex items-center gap-2",
                "px-4 py-2",
                "rounded-md bg-blue-600 shadow-sm",
                "text-sm font-medium text-white",
                "transition-colors hover:cursor-pointer hover:bg-blue-700"
            )}>
                <ListIcon size={18} />
                Show List
            </button>

            <MapContainer center={DA_NANG_CENTER} zoom={DA_NANG_ZOOM} scrollWheelZoom={true} className={clsx(
                "z-0 h-full w-full"
            )}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {hotelListMap.map(hotel => {
                    const isSelectedHotel = selectedHotel && hotel.id_hotel === selectedHotel

                    return (
                        <Marker
                            position={[hotel.latitude, hotel.longitude]}
                            icon={HotelMarkerIcon({ price: hotel.appealing_price * nightsStayin , isSelectedHotel })}
                            zIndexOffset={isSelectedHotel ? 1000 : 0}
                            key={hotel.id_hotel}
                            eventHandlers={{
                                click: () => {
                                    setSelectedHotel(hotel.id_hotel)
                                },
                            }}>

                            <Popup
                                className={clsx(
                                    "hotel-hover-popup",
                                    "relative"
                                )}
                                closeButton={false}
                                offset={[0, 15]}
                            >
                                <HotelDisplayMapCardMarker
                                    hotel={hotel}
                                    onClose={() => setSelectedHotel(null)}
                                />
                            </Popup>

                        </Marker>
                    )
                })}
                <MapBoundsWatcher handleMapViewPortChange={handleMapViewPortChange} />
            </MapContainer>
        </div>
    )
}