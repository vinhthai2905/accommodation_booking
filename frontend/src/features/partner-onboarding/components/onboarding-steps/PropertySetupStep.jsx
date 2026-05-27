import { useEffect } from "react"
import { MapPin } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix Leaflet's default icon path issues in React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
})

function LocationPicker() {
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

export default function PropertySetupStep({ wards }) {
    const { register, watch, setValue } = useFormContext()
    const address = watch("address")
    const id_ward = watch("id_ward")

    useEffect(() => {
        if (!address || !id_ward || address.trim().length < 5) return;

        const timeoutId = setTimeout(async () => {
            const ward = wards.find(w => w.id_ward.toString() === id_ward.toString());
            const wardName = ward ? ward.ward_name : "";
            const query = `${address}, ${wardName}, Đà Nẵng, Việt Nam`;

            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
                const data = await response.json();
                if (data && data.length > 0) {
                    // Update location and map will auto-fly to these coordinates
                    setValue("latitude", parseFloat(data[0].lat), { shouldValidate: true });
                    setValue("longitude", parseFloat(data[0].lon), { shouldValidate: true });
                }
            } catch (error) {
                console.error("Geocoding failed", error);
            }
        }, 1500); // 1.5s debounce

        return () => clearTimeout(timeoutId);
    }, [address, id_ward, wards, setValue]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Địa điểm & Cài đặt chỗ nghỉ</h2>
                <p className="text-sm text-gray-500">Giúp khách hàng dễ dàng tìm kiếm và đặt chỗ.</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Khu vực / Phường xã (*)</label>
                    <select 
                        {...register("id_ward", { required: true })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 transition-all text-sm"
                    >
                        <option value="">-- Chọn Phường / Xã --</option>
                        {wards.map(ward => (
                            <option key={ward.id_ward} value={ward.id_ward}>
                                {ward.ward_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Địa chỉ chi tiết (*)</label>
                    <input 
                        type="text"
                        {...register("address", { required: true })}
                        placeholder="Ví dụ: 02 Thanh Sơn, Phường Thanh Bình..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900 bg-white"
                    />
                </div>

                {/* Interactive Map Container */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-blue-50/50 p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm">
                            <MapPin size={18} /> Chọn vị trí trên bản đồ (*)
                        </div>
                        <div className="text-xs text-gray-500">
                            Click vào bản đồ để ghim vị trí chính xác
                        </div>
                    </div>
                    <div className="h-64 bg-gray-200 rounded-lg border border-gray-300 relative overflow-hidden z-0">
                        <MapContainer
                            center={[16.047079, 108.20623]}
                            zoom={13}
                            scrollWheelZoom={true}
                            className="h-full w-full z-0"
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <LocationPicker />
                        </MapContainer>
                    </div>
                </div>

            </div>
        </div>
    )
}
