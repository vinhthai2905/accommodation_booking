import CheckoutFormBorder from "../../../components/ui/CheckoutFormBorder"
import GuestFormHeader from "./GuestFormHeader"
import CheckoutGuestInput from "./CheckoutGuestInput"
import CheckoutGuestSelect from "./CheckoutGuestSelect"
import CheckoutGuestPhoneInput from "./CheckoutGuestPhoneInput"


import { useContext } from "react"
import { AuthUserContext } from "../../../context/AuthUserContext"

export default function GuestDetailsFields() {
    const { isAuthenticated, user } = useContext(AuthUserContext)
    const personalInfo = isAuthenticated ? user.personal_info : undefined

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
                    defaultValue={isAuthenticated ? personalInfo?.first_name : undefined}
                />

                <CheckoutGuestInput
                    label="Tên (tiếng Anh)"
                    required
                    type="text"
                    placeholder="ví dụ: Tuấn"
                    defaultValue={isAuthenticated ? personalInfo?.last_name : undefined}
                />
            </div>

            {/* Email, phone, country */}
            <div className="flex flex-col gap-2 mt-5 max-w-85">
                <CheckoutGuestInput
                    label="Địa chỉ email"
                    required
                    type="email"
                    placeholder="ví dụ: nguyentuan@email.com"
                    defaultValue={isAuthenticated ? user.email : undefined}
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
                    defaultValue={isAuthenticated ? personalInfo?.phone_number : undefined}
                />

                <p className="mt-2 text-sm text-slate-600">
                    Để xác minh đơn đặt và để chỗ nghỉ liên lạc khi cần
                </p>
            </div>
        </CheckoutFormBorder>
    )
}