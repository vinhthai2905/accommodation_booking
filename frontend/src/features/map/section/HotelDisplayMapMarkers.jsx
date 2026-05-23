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
    hotelsMapCacheRef,
    nightsStayin,
    selectedHotel,
    setSelectedHotel,
    handleMapViewPortChange,
    onClose,
}) {
    const daNangBounds = [
        [15.85, 107.9],
        [16.35, 108.55],
    ]
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

            <MapContainer
                center={[16.047079, 108.20623]}
                zoom={DA_NANG_ZOOM}
                scrollWheelZoom={true}
                className={"z-0 h-full w-full"}
                minZoom={10}
                maxBounds={daNangBounds}
                maxBoundsViscosity={1.0}
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors &copy; CARTO'
                    url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />
                {hotelListMap.map((hotel) => {
                    const isSelectedHotel = selectedHotel && hotel.id_hotel === selectedHotel

                    return (
                        <Marker
                            position={[hotel.latitude, hotel.longitude]}
                            icon={HotelMarkerIcon({ price: hotel.appealing_price * nightsStayin, isSelectedHotel })}
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