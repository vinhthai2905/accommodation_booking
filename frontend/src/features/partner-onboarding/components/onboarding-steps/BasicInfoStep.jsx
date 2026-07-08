import { useFormContext } from "react-hook-form"

export default function BasicInfoStep({ hotelTypes }) {
    const { register, formState: { errors } } = useFormContext()
    
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
                        {...register("hotel_name", { 
                            required: "Vui lòng nhập tên chỗ nghỉ",
                            minLength: { value: 3, message: "Tên chỗ nghỉ phải có ít nhất 3 ký tự" }
                        })}
                        placeholder="Ví dụ: Khách sạn Mường Thanh, Villa ven biển..."
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-sm bg-white ${
                            errors.hotel_name 
                                ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 text-red-900" 
                                : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        }`}
                    />
                    {errors.hotel_name && (
                        <p className="mt-1 text-sm text-red-500">{errors.hotel_name.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Loại chỗ nghỉ (*)</label>
                    <select 
                        {...register("id_hotel_type", { required: "Vui lòng chọn loại chỗ nghỉ" })}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none bg-white transition-all text-sm ${
                            errors.id_hotel_type 
                                ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 text-red-900" 
                                : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        }`}
                    >
                        <option value="">-- Chọn loại chỗ nghỉ --</option>
                        {hotelTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                    {errors.id_hotel_type && (
                        <p className="mt-1 text-sm text-red-500">{errors.id_hotel_type.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Số điện thoại liên hệ (*)</label>
                    <input 
                        type="text"
                        {...register("phone_number", { 
                            required: "Vui lòng nhập số điện thoại",
                            pattern: {
                                value: /^(0[3|5|7|8|9])+([0-9]{8})\b/,
                                message: "Số điện thoại không hợp lệ (phải bắt đầu bằng số 0, gồm 10 chữ số)"
                            }
                        })}
                        placeholder="Ví dụ: 0912345678"
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-all text-sm bg-white ${
                            errors.phone_number 
                                ? "border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 text-red-900" 
                                : "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        }`}
                    />
                    {errors.phone_number && (
                        <p className="mt-1 text-sm text-red-500">{errors.phone_number.message}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
