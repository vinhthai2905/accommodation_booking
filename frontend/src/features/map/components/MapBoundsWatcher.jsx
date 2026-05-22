import { useMapEvents } from "react-leaflet"
import { useEffect } from "react"

import { getMapBounds } from "../../../helpers/map/getMapBounds"

export default function MapBoundsWatcher({ handleMapViewPortChange }) {
    const map = useMapEvents({
        moveend() {
            handleMapViewPortChange(getMapBounds(map))
        },
        zoomend() {
            handleMapViewPortChange(getMapBounds(map))
        }
    })

    useEffect(() =>{
        handleMapViewPortChange(getMapBounds(map))
    }, [handleMapViewPortChange, map])
}