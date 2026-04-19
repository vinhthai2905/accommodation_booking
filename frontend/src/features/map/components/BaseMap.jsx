import { clsx } from "clsx"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { List as ListIcon } from "lucide-react"

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import "leaflet/dist/leaflet.css"

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;


export default function BaseMap({ onClose }) {
    return (
        <div className={clsx(
            "relative z-0 h-full flex-1",
            "hidden md:block"
        )}>
            <MapContainer center={[10.7769, 106.7009]} zoom={13} scrollWheelZoom={true} className={clsx(
                "z-0 h-full w-full"
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

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[10.7769, 106.7009]}>
                    <Popup>
                        A sample hotel here. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <Marker position={[10.7626, 106.6601]}>
                    <Popup>
                        The Rixx Everich 2 beds...
                    </Popup>
                </Marker>
            </MapContainer>

        </div>
    )
}