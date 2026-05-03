import CheckoutFormBorder from "../../../components/ui/CheckoutFormBorder"
import GuestFormHeader from "./GuestFormHeader"
import CheckoutGuestInput from "./CheckoutGuestInput"
import CheckoutGuestSelect from "./CheckoutGuestSelect"
import CheckoutGuestPhoneInput from "./CheckoutGuestPhoneInput"


import { useContext } from "react"
import { AuthUserContext } from "../../../context/AuthUserContext"
import { useFormContext } from "react-hook-form"

export default function GuestDetailsFields() {
    const { isAuthenticated, user } = useContext(AuthUserContext)
    const personalInfo = isAuthenticated ? user.personal_info : undefined
    const { register, formState: { errors } } = useFormContext()

    return (
        <CheckoutFormBorder>
            <GuestFormHeader />

            {/* Personal Infomation */}
            <div className="mt-6 grid grid-cols-2 gap-4">
                <CheckoutGuestInput
                    register={register("firstName", {
                        required: "Vui lòng nhập họ của bạn."
                    })}
                    label="Họ (tiếng Anh)"
                    type="text"
                    placeholder="ví dụ: Nguyễn"
                    defaultValue={isAuthenticated ? personalInfo?.first_name : undefined}
                    error={errors?.firstName}
                />

                <CheckoutGuestInput
                    register={register("lastName", {
                        required: "Vui lòng nhập tên của bạn."
                    })}
                    label="Tên (tiếng Anh)"
                    type="text"
                    placeholder="ví dụ: Tuấn"
                    defaultValue={isAuthenticated ? personalInfo?.last_name : undefined}
                    error={errors?.lastName}
                />
            </div>

            {/* Email, phone, country */}
            <div className="flex flex-col gap-2 mt-5 max-w-85">
                <CheckoutGuestInput
                    register={register("email", {
                        require: "Vui lòng nhập email của bạn."
                    })}
                    label="Địa chỉ email"
                    type="email"
                    placeholder="ví dụ: nguyentuan@email.com"
                    defaultValue={isAuthenticated ? user.email : undefined}
                    error={errors?.email}
                />

                <p className="mt-2 text-sm text-slate-600">
                    Email xác nhận đặt phòng sẽ được gửi đến địa chỉ này
                </p>

                <CheckoutGuestSelect
                    register={register("country", {
                        require: "Vui lòng chọn quốc gia của bạn."
                    })}
                    label="Vùng/quốc gia"
                    defaultValue="Việt Nam"
                    options={["Việt Nam"]}
                    error={errors?.country}
                />
            </div>

            <div className="mt-5 max-w-120">
                <CheckoutGuestPhoneInput
                    register={register("phoneNumber", {
                        require: "Vui lòng nhập số điện thoại của bạn."
                    })}
                    label="Số điện thoại"
                    codeDefaultValue="VN +84"
                    codeOptions={["VN +84", "TH +66", "SG +65", "JP +81"]}
                    placeholder="ví dụ: 912345678"
                    defaultValue={isAuthenticated ? personalInfo?.phone_number : undefined}
                    error={errors?.phoneNumber}
                />

                <p className="mt-2 text-sm text-slate-600">
                    Để xác minh đơn đặt và để chỗ nghỉ liên lạc khi cần
                </p>
            </div>
        </CheckoutFormBorder>
    )
}