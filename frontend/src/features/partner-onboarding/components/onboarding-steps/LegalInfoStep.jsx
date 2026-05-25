import { Upload, Check, Info } from "lucide-react"
import { useFormContext } from "react-hook-form"

export default function LegalInfoStep({ handleFileChange, hotelTypes, wards }) {
    const { register, watch } = useFormContext()
    
    const document_file = watch("document_file")
    const document_url = watch("document_url")
    const hotel_name = watch("hotel_name")
    const id_hotel_type = watch("id_hotel_type")
    const id_ward = watch("id_ward")
    const address = watch("address")

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Xác minh đối tác & Thông tin pháp lý</h2>
                <p className="text-sm text-gray-500">Cung cấp tài liệu kinh doanh để xác minh danh tính đối tác pháp lý.</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tên tài liệu chứng thực (*)</label>
                    <select 
                        {...register("document_name", { required: true })}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 transition-all text-sm"
                    >
                        <option value="Giấy phép kinh doanh">Giấy phép đăng ký kinh doanh</option>
                        <option value="Căn cước công dân">Căn cước công dân (Đại diện pháp luật)</option>
                        <option value="Giấy phép PCCC">Giấy chứng nhận an toàn PCCC</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tải lên tệp tài liệu (*)</label>
                    <label className="mt-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg px-6 py-8 bg-gray-50/50 hover:bg-gray-50 hover:border-blue-400 cursor-pointer transition-all text-center relative group">
                        <input 
                            type="file"
                            accept=".pdf,image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <Upload className="text-gray-400 group-hover:text-blue-500 mb-3 transition-colors" size={32} />
                        <div className="text-sm text-gray-600 mb-3">
                            {document_file ? (
                                <span className="text-green-600 font-semibold flex items-center justify-center gap-1">
                                    <Check size={16} /> Đã chọn tệp: {document_file.name}
                                </span>
                            ) : document_url ? (
                                <span className="text-green-600 font-semibold flex items-center justify-center gap-1">
                                    <Check size={16} /> Đã tải lên tài liệu: {document_url.split('/').pop()}
                                </span>
                            ) : (
                                <span>Nhấp vào đây để chọn tệp từ máy của bạn (PDF, JPG, PNG)</span>
                            )}
                        </div>
                        <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 shadow-sm transition-colors">
                            Tải lên tại đây
                        </span>
                    </label>
                </div>

                {/* Review summary inline at final step */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                    <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                        <Info size={16} className="text-blue-600" /> Xem lại thông tin đã khai báo:
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-2 text-xs md:text-sm">
                        <div className="grid grid-cols-2">
                            <span className="text-gray-500">Tên chỗ nghỉ:</span>
                            <span className="font-semibold text-gray-800 text-right">{hotel_name}</span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="text-gray-500">Loại chỗ nghỉ:</span>
                            <span className="font-semibold text-gray-800 text-right">
                                {hotelTypes.find(t => t.id.toString() === id_hotel_type?.toString())?.name || id_hotel_type}
                            </span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="text-gray-500">Khu vực:</span>
                            <span className="font-semibold text-gray-800 text-right">
                                {wards.find(w => w.id_ward.toString() === id_ward?.toString())?.ward_name || id_ward}
                            </span>
                        </div>
                        <div className="grid grid-cols-2">
                            <span className="text-gray-500">Địa chỉ:</span>
                            <span className="font-semibold text-gray-800 text-right">{address}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
