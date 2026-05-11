import { clsx } from "clsx"
import { Link } from "react-router"

export default function DashboardNavLink({ to, closeAllNav, label }) {
    return (
        <Link
            to={to}
            onClick={() => closeAllNav()}
            className={clsx(
                "block px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                "text-gray-800 hover:bg-gray-300 hover:text-gray-900"
            )}
        >
            {label}
        </Link>
    )
}