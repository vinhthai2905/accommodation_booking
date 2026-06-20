import { useEffect } from "react"
import axios from "axios"

export function usePropertyLocation(address, id_ward, wards, setValue) {
    useEffect(() => {
        if (!address || !id_ward || address.trim().length < 5) return

        const timeoutId = setTimeout(async () => {
            const ward = wards.find(w => w.id_ward.toString() === id_ward.toString())
            const wardName = ward ? ward.ward_name : ""
            const query = `${address}, ${wardName}, Đà Nẵng, Việt Nam`

            try {
                const { data } = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`)
                if (data && data.length > 0) {
                    setValue("latitude", parseFloat(data[0].lat), { shouldValidate: true })
                    setValue("longitude", parseFloat(data[0].lon), { shouldValidate: true })
                }
            } catch (error) {
                console.error("Geocoding failed", error)
            }
        }, 1500) // 1.5s debounce

        return () => clearTimeout(timeoutId)
    }, [address, id_ward, wards, setValue])

    return null
}