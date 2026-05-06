import { clsx } from "clsx"
import { useContext } from "react"
import { AuthUserContext } from "../../../../context/AuthUserContext"

export default function AuthenticatedCard() {
    const { user } = useContext(AuthUserContext)

    return (
        <div className={clsx(
            "rounded-lg bg-white border border-gray-300 p-4",
            "flex items-center gap-4"
        )}>
            <div className={clsx(
                "flex items-center justify-center",
                "h-12 w-12 rounded-full",
                "bg-purple-600 text-white text-xl font-medium",
                "ring-2 ring-yellow-500 ring-offset-2"
            )}>
                V
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-black">
                    Bạn đã được đăng nhập
                </span>
                <span className="text-gray-500 text-sm">
                    {user.email}
                </span>
            </div>
        </div>
    )
}
