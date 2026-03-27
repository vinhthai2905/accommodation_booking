import { clsx } from "clsx"

const tabs = [
    { label: "Tổng quan", isActive: true },
    { label: "Thông tin căn hộ & giá" },
    { label: "Tiện nghi" },
    { label: "Quy tắc chung" },
    { label: "Thông tin pháp lý và quan trọng" },
    { label: "Đánh giá của khách (330)" },
]

export default function PropertyTabs() {
    return (
        <div className="mt-5 border-b border-gray-300">
            <ul className="flex items-stretch">
                {tabs.map((tab) => (
                    <li key={tab.label}>
                        <button
                            type="button"
                            className={clsx(
                                "px-5 py-5 text-base text-gray-800",
                                "border-b-2 border-transparent",
                                "hover:bg-gray-300",
                                tab.isActive && "border-blue-600 text-black"
                            )}
                        >
                            {tab.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}