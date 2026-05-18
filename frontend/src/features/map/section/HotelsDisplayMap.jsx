import HotelDisplayMapCardMarker from "../components/HotelDisplayMapCardMarker"

import { Tooltip } from "react-leaflet"

import { clsx } from "clsx"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Hotel, List as ListIcon } from "lucide-react"

import "leaflet/dist/leaflet.css"
import "../css/search-map.css"


export default function HotelsDisplayMap({
    onClose,
    hotelListMap,
    setSelectedHotel
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
                {/* <Marker position={[10.7769, 106.7009]}>
                    <Popup>
                        <HotelDisplayMapCardTest name={"Ruby Star Da Nang - Central My Khe Beach"}/>
                    </Popup>
                </Marker> */}
                {hotelListMap.map(hotel => {
                    return (
                        <Marker
                            position={[hotel.latitude, hotel.longitude]}
                            key={hotel.id_hotel}
                            eventHandlers={{
                                click: () => {
                                    setSelectedHotel(hotel)
                                },
                            }}>

                            <Tooltip
                                direction="top"
                                offset={[0, -10]}
                                opacity={1}
                            >
                                <HotelDisplayMapCardMarker hotel={hotel} />
                            </Tooltip>

                        </Marker>
                    )
                })}
            </MapContainer>
        </div>
    )
}