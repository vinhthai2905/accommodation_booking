import { Map, MapPin, Umbrella, TreePine } from "lucide-react"

export default function OnboardingPropertyLocationForm({register, wards, watch}) {
    return (
        <>
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

                <div className="border border-blue-100 rounded-xl p-4 bg-linear-to-r from-blue-50 to-indigo-50 mt-4 shadow-sm relative overflow-hidden">
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
        </>
    )
}