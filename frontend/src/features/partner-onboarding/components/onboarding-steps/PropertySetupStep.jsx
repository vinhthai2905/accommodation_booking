import { MapPin } from "lucide-react"

export default function PropertySetupStep({ formData, handleInputChange, wards, channelManager, setChannelManager }) {
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
                        name="id_ward"
                        value={formData.id_ward}
                        onChange={handleInputChange}
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
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Ví dụ: 02 Thanh Sơn, Phường Thanh Bình..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900 bg-white"
                    />
                </div>

                {/* Simulated Map Container */}
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-blue-50/50 p-4">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-3">
                        <MapPin size={18} /> Bản đồ định vị mô phỏng
                    </div>
                    <div className="h-48 bg-gray-200 rounded-lg border border-gray-300 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                                <MapPin size={16} />
                            </div>
                            <span className="text-xs font-semibold bg-white border border-gray-300 rounded px-2 py-0.5 shadow mt-1 whitespace-nowrap">
                                {formData.address || "Địa điểm của bạn"}
                            </span>
                        </div>
                        <div className="absolute bottom-2 right-2 text-[10px] text-gray-500 bg-white/80 px-1 py-0.5 rounded">
                            Google Map Simulator
                        </div>
                    </div>
                </div>

                {/* Channel Manager Simulation */}
                <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50/50">
                    <p className="text-sm font-semibold text-gray-700">Kết nối với công cụ quản lý kênh?</p>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                            <input 
                                type="radio" 
                                name="channel_manager" 
                                checked={channelManager === "yes"}
                                onChange={() => setChannelManager("yes")}
                                className="text-blue-600"
                            />
                            Có, kết nối với bên thứ ba
                        </label>
                        <label className="flex items-center gap-2.5 text-sm text-gray-600 cursor-pointer">
                            <input 
                                type="radio" 
                                name="channel_manager" 
                                checked={channelManager === "no"}
                                onChange={() => setChannelManager("no")}
                                className="text-blue-600"
                            />
                            Không sử dụng tại thời điểm này
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}
