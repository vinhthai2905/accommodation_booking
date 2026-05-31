import { clsx } from "clsx"
import { useEffect, useState } from "react"

import { checkTokenExpiration, getRemainingMinutes } from "../../helpers/getRemainingMinutes"

export default function FieldEmailVerificationCount({ 
    handleSendVerificationEmail, 
    isSending, 
    isVerificationExpired,
    setIsVerificationExpired, 
    verificationExpiresAt 
}) {
    const [verificationTimeout, setVerificationTimeout] = useState(null)

    useEffect(() => {
        const verificationExpiration = setInterval(() => {
            if (checkTokenExpiration(verificationExpiresAt)) {
                setIsVerificationExpired(true)
                clearInterval(verificationExpiration)
            }

            const minutes = getRemainingMinutes(verificationExpiresAt)
            setVerificationTimeout(minutes)

        }, 1000)

        return () => clearInterval(verificationExpiration)
    }, [verificationExpiresAt])

    return (
        <div className="mt-4 border border-amber-300 rounded-lg p-4 bg-amber-50">
            {
                isVerificationExpired
                    ? (
                        <>
                            <p className="text-sm text-amber-800 mb-2">
                                Vui lòng xác minh địa chỉ email của bạn để đảm bảo có thể nhận thông tin về các đặt phòng.
                            </p>
                            <button
                                onClick={() => {
                                    handleSendVerificationEmail()
                                }}
                                disabled={isSending}
                                className={`text-sm font-medium ${isSending ? 'text-amber-500 cursor-wait' : 'text-amber-700 hover:text-amber-800 cursor-pointer'}`}
                            >
                                {isSending ? 'Đang gửi...' : 'Gửi email xác minh'}
                            </button>
                        </>
                    )
                    : (
                        <p className={clsx(
                            "inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100/80 rounded-md border border-amber-200 shadow-sm transition-all",
                            "text-amber-700 text-sm font-medium "
                        )}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 animate-pulse">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            Gửi lại sau {verificationTimeout} phút
                        </p>
                    )
            }
        </div>
    )
}