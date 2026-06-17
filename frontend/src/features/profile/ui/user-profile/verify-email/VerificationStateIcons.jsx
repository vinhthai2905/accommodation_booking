import { clsx } from "clsx"
import { Mail, ShieldCheck, XCircle } from "lucide-react"

export default function VerificationStateIcons({ isVerificationError, isVerificationPending, verifyMutation }) {
    return (
        <div className={clsx(
            "w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ease-out",
            isVerificationPending && "bg-blue-100 shadow-[0_0_40px_rgba(59,130,246,0.3)]",
            verifyMutation.isSuccess && "bg-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.3)] scale-110",
            isVerificationError && "bg-rose-100 shadow-[0_0_40px_rgba(244,63,94,0.3)] scale-110"
        )}>
            {isVerificationPending && (
                <Mail className="w-10 h-10 text-blue-600 animate-bounce" />
            )}
            {verifyMutation.isSuccess && (
                <ShieldCheck className="w-12 h-12 text-emerald-600 animate-[spin_0.5s_ease-out]" />
            )}
            {isVerificationError && (
                <XCircle className="w-12 h-12 text-rose-600 animate-[shake_0.5s_ease-in-out]" />
            )}
        </div>
    )
}