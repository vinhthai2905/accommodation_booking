import { useState } from "react"
import { clsx } from "clsx"
import { Info, ChevronUp, ChevronDown } from "lucide-react"


export default function SecurityBanner() {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className={clsx(
            "overflow-hidden",
            "rounded-xl border border-gray-200",
            "bg-white",
        )}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={clsx(
                    "flex items-center justify-between",
                    "w-full",
                    "p-4",
                    "text-left",
                )}
            >
                <div className="flex items-center gap-3">
                    <Info className="shrink-0 text-amber-500" size={18} />
                    <span className="text-sm font-semibold text-slate-900">
                        Bảo mật online
                    </span>
                </div>

                {isOpen ? (
                    <ChevronUp className="shrink-0 text-slate-500" size={18} />
                ) : (
                    <ChevronDown className="shrink-0 text-slate-500" size={18} />
                )}
            </button>

            {isOpen && (
                <div className={clsx(
                    "px-4 pb-4 pt-3",
                    "text-sm",
                    "text-slate-600",
                    "border-t border-gray-100",
                )}>
                    <p>
                        Bảo vệ an toàn của bản thân bằng cách không chia sẻ thông tin cá nhân hay thẻ tín dụng qua cuộc gọi, email hay tin nhắn.
                    </p>
                    <a
                        href="#"
                        className={clsx(
                            "inline-block",
                            "mt-2",
                            "font-medium text-blue-600",
                            "hover:underline",
                        )}
                    >
                        Tìm hiểu thêm
                    </a>
                </div>
            )}
        </div>
    )
}