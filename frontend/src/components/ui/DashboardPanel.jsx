import { clsx } from "clsx"
import { Link } from "react-router"

export default function DashboardPanel({ to, panel }) {
    return (
        <div className={clsx("flex items-center justify-between h-16 px-6 border-b border-gray-200")}>
            <Link to={to} className={clsx(
                "text-xl font-bold bg-clip-text text-transparent",
                "bg-linear-to-r from-blue-600 to-indigo-600"
            )}>
                {panel}
            </Link>
        </div>
    )
}