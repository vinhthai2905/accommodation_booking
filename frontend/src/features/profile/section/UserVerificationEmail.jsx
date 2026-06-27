import VerificationSuccessButton from "../ui/user-profile/verify-email/VerificationSuccessButton"
import VerificationFailedButton from "../ui/user-profile/verify-email/VerificationFailedButton"
import VerificationStateIcons from "../ui/user-profile/verify-email/VerificationStateIcons"

import { useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router"
import { clsx } from "clsx"
import { useQueryClient } from "@tanstack/react-query"

import { useUserVerifyEmailMutation } from "../../../hooks/profile/user-profile/useUserVerifyEmailMutation"


export default function UserVerificationEmail() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const verifyMutation = useUserVerifyEmailMutation()
    const queryClient = useQueryClient()

    const uid = searchParams.get("uid")
    const token = searchParams.get("token")
    const hasInvalidParams = !uid || !token

    const isVerificationError = hasInvalidParams || verifyMutation.isError
    const isVerificationPending = !isVerificationError && verifyMutation.isPending 

    useEffect(() => {
        if (hasInvalidParams) {
            return
        }

        if (verifyMutation.isIdle) {
            verifyMutation.mutate({ uid, token })
        }
    })

    useEffect(() => {
        if (verifyMutation.isSuccess) {
            queryClient.invalidateQueries({ queryKey: ["fetchAuthUser"] })
            queryClient.invalidateQueries({ queryKey: ["userProfile"] })
        }
    }, [verifyMutation.isSuccess, queryClient])

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-12 overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
                <div
                    className={clsx(
                        "absolute top-0 left-0 w-full h-1.5 transition-colors duration-500",
                        isVerificationError ? "bg-rose-500" : null,
                        isVerificationPending ? "bg-blue-500 animate-pulse" : null,
                        verifyMutation.isSuccess ? "bg-emerald-500" : null,
                    )}
                ></div>

                <div className="flex flex-col items-center text-center space-y-6">

                    <div className="relative">
                        <VerificationStateIcons
                            isVerificationError={isVerificationError}
                            isVerificationPending={isVerificationPending}
                            verifyMutation={verifyMutation}
                        />

                        {verifyMutation === "loading" && (
                            <svg className="absolute top-0 left-0 w-24 h-24 text-blue-500 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </div>

                    <div className="space-y-3 transition-all duration-500">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {isVerificationError && "Xác thực thất bại"}
                            {isVerificationPending && "Đang xác thực..."}
                            {verifyMutation.isSuccess && "Xác thực thành công!"}
                        </h2>

                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed px-4">
                            {isVerificationError && "Rất tiếc, liên kết xác thực này không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu một liên kết mới từ trang cá nhân."}
                            {isVerificationPending && "Vui lòng đợi trong giây lát, chúng tôi đang kiểm tra thông tin của bạn. Quá trình này sẽ diễn ra rất nhanh."}
                            {verifyMutation.isSuccess && "Tuyệt vời! Địa chỉ email của bạn đã được xác nhận. Bạn đã có thể sử dụng đầy đủ các tính năng của chúng tôi."}
                        </p>
                    </div>

                    <div className="w-full pt-6">
                        {verifyMutation.isSuccess && (
                            <VerificationSuccessButton navigate={navigate} />
                        )}

                        {isVerificationError && (
                            <VerificationFailedButton navigate={navigate} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
