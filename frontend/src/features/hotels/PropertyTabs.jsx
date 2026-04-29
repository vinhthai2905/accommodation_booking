import { NavLink } from "react-router"
import { clsx } from "clsx"

const tabLinkClassName = clsx(
    "flex h-full w-full items-center justify-center",
    "px-2 py-5 text-center text-sm",
    "text-gray-800",
    "border-b-2 border-transparent",
    "hover:bg-gray-300 cursor-pointer border-2"
)


export default function PropertyTabs() {
    return (
        <div className="mt-5 border-b border-gray-300">
            <ul className="grid w-full grid-cols-6">
                <li className="h-full w-full">
                    <NavLink
                        to="/index"
                        className={tabLinkClassName}
                    >
                        Tổng quan
                    </NavLink>
                </li>

                <li className="h-full w-full">
                    <NavLink
                        to="/index"
                        className={tabLinkClassName}
                    >
                        Thông tin căn hộ & giá
                    </NavLink>
                </li>

                <li className="h-full w-full">
                    <NavLink
                        to="/index"
                        className={tabLinkClassName}
                    >
                        Tiện nghi
                    </NavLink>
                </li>

                <li className="h-full w-full">
                    <NavLink
                        to="/index"
                        className={tabLinkClassName}
                    >
                        Quy tắc chung
                    </NavLink>
                </li>

                <li className="h-full w-full">
                    <NavLink
                        to="/index"
                        className={tabLinkClassName}
                    >
                        Thông tin pháp lý và quan trọng
                    </NavLink>
                </li>

                <li className="h-full w-full">
                    <NavLink
                        to="/index"
                        className={tabLinkClassName}
                    >
                        Đánh giá của khách (330)
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}