import { clsx } from "clsx"
import { Link } from "react-router"

export default function ServiceItem({ pathLink, serviceName, to = "#" }) {
    return (
        <li className={clsx(
            "px-2 py-2",
            "hover:bg-[#1a4fa0] hover:rounded-2xl hover:cursor-pointer",

        )}>
            <Link to={to}>
                <span className={clsx(
                    "flex gap-3",
                    "sm:gap-2",
                    "md:gap-2",
                )}>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" fill="white">
                            <path d={pathLink}></path>
                        </svg>
                    </span>
                    <div className="text-sm">{serviceName}</div>
                </span>
            </Link>
        </li>
    )
}