import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { useMapEvents, useMap, Marker } from "react-leaflet"

export default function PropertyLocationPicker() {
    const { setValue, watch } = useFormContext()
    const lat = watch("latitude")
    const lng = watch("longitude")
    const map = useMap()

    useEffect(() => {
        if (lat && lng) {
            map.flyTo([lat, lng], 16, { animate: true })
        }
    }, [lat, lng, map])

    useMapEvents({
        click(e) {
            setValue("latitude", e.latlng.lat, { shouldValidate: true })
            setValue("longitude", e.latlng.lng, { shouldValidate: true })
        },
    })

    return lat && lng ? (
        <Marker position={[lat, lng]} />
    ) : null
}