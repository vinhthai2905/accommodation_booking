import { clsx } from "clsx"
import { LogOut } from "lucide-react"

export default function DashboardLogout() {
    return (
        <div className={clsx("p-4 border-t border-gray-700")}>
            <button className={clsx(
                "flex items-center gap-3 w-full px-4 py-3 rounded-xl",
                "text-red-400 hover:bg-red-500/10",
                "transition-colors"
            )}>
                <LogOut size={20} />
                <span className={clsx("font-medium")}>Logout</span>
            </button>
        </div>
    )
}