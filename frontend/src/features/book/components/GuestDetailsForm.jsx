import CheckoutFormBorder from "../../../components/ui/CheckoutFormBorder"

import GuestFormHeader from "./GuestFormHeader"
import CheckoutGuestInput from "./CheckoutGuestInput"
import CheckoutGuestSelect from "./CheckoutGuestSelect"
import CheckoutGuestPhoneInput from "./CheckoutGuestPhoneInput"

export default function GuestDetailsForm() {
    return (
        <CheckoutFormBorder>
            <GuestFormHeader />

            {/* Personal Infomation */}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <CheckoutGuestInput
                    label="Họ (tiếng Anh)"
                    required
                    type="text"
                    placeholder="ví dụ: Nguyễn"
                />

                <CheckoutGuestInput
                    label="Tên (tiếng Anh)"
                    required
                    type="text"
                    placeholder="ví dụ: Tuấn"
                />
            </div>

            {/* Email, phone, country */}
            <div className="flex flex-col gap-2 mt-5 max-w-85">
                <CheckoutGuestInput
                    label="Địa chỉ email"
                    required
                    type="email"
                    placeholder="ví dụ: nguyentuan@email.com"
                />

                <p className="mt-2 text-sm text-slate-600">
                    Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
                </p>

                <CheckoutGuestSelect
                    label="Vùng/quốc gia"
                    required
                    defaultValue="Việt Nam"
                    options={["Việt Nam", "Thailand", "Singapore", "Japan"]}
                />
            </div>

            <div className="mt-5 max-w-120">
                <CheckoutGuestPhoneInput
                    label="Số điện thoại"
                    required
                    codeDefaultValue="VN +84"
                    codeOptions={["VN +84", "TH +66", "SG +65", "JP +81"]}
                    placeholder="ví dụ: 912345678"
                />

                <p className="mt-2 text-sm text-slate-600">
                    Để xác minh đơn đặt và để chỗ nghỉ liên lạc khi cần
                </p>
            </div>


            <div className="mt-5 border-gray-300 pb-6">
                <label className="flex items-start gap-3">
                    <input type="checkbox" className="mt-1 h-6 w-6" />

                    <div>
                        <p className=" text-slate-900">
                            Có, tôi muốn xác nhận điện tử miễn phí (được đề xuất)
                        </p>
                        <p className="text-slate-600">
                            Chúng tôi sẽ nhắn tin cho bạn đường dẫn để tải ứng dụng
                        </p>
                    </div>
                </label>
            </div>
        </CheckoutFormBorder>
    )
}