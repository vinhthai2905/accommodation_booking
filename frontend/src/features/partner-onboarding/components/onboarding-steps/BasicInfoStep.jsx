import { useFormContext } from "react-hook-form"

export default function BasicInfoStep({ hotelTypes }) {
    const { register } = useFormContext()
    
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Tên chỗ nghỉ Quý vị?</h2>
                <p className="text-sm text-gray-500">Đặt tên ấn tượng để thu hút khách hàng tiềm năng.</p>
            </div>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tên chỗ nghỉ (*)</label>
                    <input 
                        type="text"
                        {...register("hotel_name", { required: true })}
                        placeholder="Ví dụ: Khách sạn Mường Thanh, Villa ven biển..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900 bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Loại chỗ nghỉ (*)</label>
                    <select 
                        {...register("id_hotel_type", { required: true })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 transition-all text-sm"
                    >
                        <option value="">-- Chọn loại chỗ nghỉ --</option>
                        {hotelTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại liên hệ (*)</label>
                    <input 
                        type="text"
                        {...register("phone_number", { required: true })}
                        placeholder="Số điện thoại dùng để liên lạc"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm text-gray-900 bg-white"
                    />
                </div>
            </div>
        </div>
    )
}
