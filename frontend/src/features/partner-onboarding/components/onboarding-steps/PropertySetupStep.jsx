import { useEffect } from "react"
import { MapPin, Umbrella, TreePine, Map } from "lucide-react"
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

export default function PropertySetupStep({ wards, prevStep, nextStep }) {
    const { register, watch, setValue } = useFormContext()
    const address = watch("address")
    const id_ward = watch("id_ward")
    const latitude = watch("latitude")
    const longitude = watch("longitude")

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

    useEffect(() => {
        if (!latitude || !longitude) return;

        const timeoutId = setTimeout(async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
                const response = await fetch(`${apiUrl}/api/location/distance-to-beach?lat=${latitude}&lng=${longitude}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.distance_meters !== undefined) {
                        setValue("distance_to_beach", data.distance_meters, { shouldValidate: true });
                        setValue("is_near_beach", data.is_near_beach, { shouldValidate: true });
                    }
                }
            } catch (error) {
                console.error("Failed to fetch distance to beach", error);
            }
        }, 1000); // 1s debounce to prevent spamming

        return () => clearTimeout(timeoutId);
    }, [latitude, longitude, setValue]);

    return (
        <div className="absolute inset-0 z-0">
            {/* Interactive Map Container (Full Screen Background) */}
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

            {/* Floating Form Popup */}
            <div className="absolute top-6 left-6 z-10 w-full max-w-[420px] bg-white rounded-xl shadow-2xl p-6 max-h-[calc(100vh-180px)] overflow-y-auto border border-gray-100">
                <div className="mb-6">
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

                    <div className="pt-2">
                        <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2">
                            <MapPin size={18} /> Chọn vị trí trên bản đồ (*)
                        </div>
                        <p className="text-xs text-gray-500">
                            Click vào bản đồ rộng bên ngoài để ghim vị trí chính xác.
                        </p>
                    </div>

                    {/* Khoảng cách gần biển - Auto Calculated Banner */}
                    <div className="border border-blue-100 rounded-xl p-4 bg-gradient-to-r from-blue-50 to-indigo-50 mt-4 shadow-sm relative overflow-hidden">
                        {/* Hidden inputs to preserve form data */}
                        <input type="hidden" {...register("is_near_beach")} />
                        <input type="hidden" {...register("distance_to_beach")} />

                        {watch("distance_to_beach") ? (
                            <div className="flex items-start gap-4">
                                <div className={`p-2.5 rounded-full ${watch("is_near_beach") ? 'bg-blue-200 text-blue-700' : 'bg-emerald-200 text-emerald-700'}`}>
                                    {watch("is_near_beach") ? <Umbrella size={22} /> : <TreePine size={22} />}
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-1">
                                        {watch("is_near_beach") ? "Tuyệt vời! Chỗ nghỉ gần biển 🏖️" : "Không gian yên tĩnh 🌴"}
                                    </h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {watch("is_near_beach") 
                                            ? <>Chỗ nghỉ của bạn cách bãi biển gần nhất chỉ <strong>{watch("distance_to_beach")} mét</strong>. Du khách sẽ rất thích điều này!</>
                                            : <>Chỗ nghỉ của bạn cách biển <strong>{watch("distance_to_beach")} mét</strong>, phù hợp cho những ai tìm kiếm sự yên tĩnh.</>}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-start gap-4 opacity-60">
                                <div className="p-2.5 rounded-full bg-gray-200 text-gray-500">
                                    <Map size={22} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800 mb-1">Đang chờ tính khoảng cách...</h4>
                                    <p className="text-xs text-gray-600">Hệ thống sẽ tự động tính khoảng cách tới biển khi bạn ghim vị trí trên bản đồ.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation Buttons directly inside the popup */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                    <button
                        type="button"
                        onClick={prevStep}
                        className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-2 text-sm"
                    >
                        Quay lại
                    </button>
                    <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2.5 bg-[#006ce4] hover:bg-[#0053b4] text-white font-bold rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
                    >
                        Tiếp tục
                    </button>
                </div>
            </div>
        </div>
    )
}
