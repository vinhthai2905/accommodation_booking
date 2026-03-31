import { clsx } from "clsx"

import { Link } from "react-router";

import { MapContainer, TileLayer, Marker } from "react-leaflet"

import Icon from "/src/components/ui/Icon";

export default function MapCard() {

    return (
            <div className={clsx(
                "relative"
            )}>
                <MapContainer
                    center={[10.7769, 106.7009]}
                    zoom={13}
                    className={clsx(
                        "h-40 w-65 rounded-lg"
                    )}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[10.7769, 106.7009]} />
                </MapContainer>
                <Link>
                    <span className={clsx(
                        "absolute left-13 right-13 bottom-7 z-1000 py-1",
                        "bg-blue-500 rounded-sm",
                        "text-center text-white text-sm font-medium",
                        "hover:cursor-pointer hover:bg-blue-600"
                    )}>
                        <span className={clsx(
                            "flex justify-center gap-0.5"
                        )}>
                            <Icon fill={"M12 0a8.01 8.01 0 0 0-8 8c0 3.51 5 12.025 7.148 15.524A1 1 0 0 0 12 24a.99.99 0 0 0 .852-.477C15 20.026 20 11.514 20 8a8.01 8.01 0 0 0-8-8m0 11.5A3.5 3.5 0 1 1 15.5 8a3.5 3.5 0 0 1-3.5 3.5"}></Icon>
                            Xem trên bản đồ
                        </span>
                    </span>
                </Link>
            </div>

    )
}