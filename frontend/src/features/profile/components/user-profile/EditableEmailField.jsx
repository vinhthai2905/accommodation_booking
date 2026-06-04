import FieldEmailVerificationStatus from "../../ui/user-profile/FieldEmailVerificationStatus"
import FieldEmailVerificationCount from "../../ui/user-profile/FieldEmailVerificationCount"

import { useState } from "react"

import useUserEmailMutation from "../../../../hooks/profile/user-profile/useUserEmailMutation"

import { checkIsExpiration } from "../../helpers/getRemainingMinutes"

export default function EditableEmailField({ email, verifiedAt, verificationExpiresAt }) {
    const [isVerificationExpired, setIsVerificationExpired] = useState(checkIsExpiration(verificationExpiresAt))
    const { handleSendVerificationEmail, isSending } = useUserEmailMutation(setIsVerificationExpired)

    return (
        <div className="py-5 flex flex-col sm:flex-row gap-4 border-b border-gray-200">
            <div className="sm:w-64 shrink-0 pt-1">
                <span className="text-slate-900">Địa chỉ email</span>
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="text-slate-900">{email}</span>
                    <FieldEmailVerificationStatus verifiedAt={verifiedAt} />
                </div>
                <p className="text-slate-500 text-sm mt-1">
                    Đây là địa chỉ email bạn dùng để đăng nhập. Đây cũng là nơi chúng tôi gửi xác nhận đặt phòng của bạn.
                </p>
                {!verifiedAt ? (
                    <FieldEmailVerificationCount
                        handleSendVerificationEmail={handleSendVerificationEmail}
                        isSending={isSending}
                        isVerificationExpired={isVerificationExpired}
                        setIsVerificationExpired={setIsVerificationExpired}
                        verificationExpiresAt={verificationExpiresAt}
                    />
                ) : (
                    <div className="mt-4 border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                        <p className="text-sm text-slate-600 mb-2">
                            Không thể truy cập email của bạn? Nếu bạn đã thêm số điện thoại di động cho một trong những lần lưu trú đã hoàn tất trước đó,
                            bạn có thể thay đổi địa chỉ email của mình bằng cách xác minh số điện thoại di động
                        </p>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                            Thay đổi email bằng xác minh điện thoại
                        </button>
                    </div>
                )}
            </div>
            <div className="shrink-0 pt-1 flex justify-end">
                <button disabled className="text-gray-400 font-medium cursor-not-allowed">Chỉnh sửa</button>
            </div>
        </div>
    )
}