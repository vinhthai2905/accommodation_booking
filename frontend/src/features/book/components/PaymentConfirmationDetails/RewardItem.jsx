export default function RewardItem({ icon, title, badge, description }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-slate-900 text-sm">{title}</span>
                    {badge && (
                        <span className="px-1.5 py-0.5 text-xs font-bold bg-green-100 text-green-700 rounded">
                            {badge}
                        </span>
                    )}
                    {title === "Thuê xe" && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded">
                            Ưu Đãi Chuyến Đi
                        </span>
                    )}
                </div>
                <p className="mt-0.5 text-xs text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    )
}