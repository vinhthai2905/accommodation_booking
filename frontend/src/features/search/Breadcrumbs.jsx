import { clsx } from "clsx"

import BreadcrumItem from "./BreadcrumItem"

export default function Breadcrumbs() {
    const items = [
        { label: "Home page", to: "/" },
        { label: "Vietnam", to: "/vietnam" },
        { label: "TP. Ho Chi Minh", to: "/hcm" },
    ]

    return (
        <div className="text-xs text-[#066ce4]">
            <ul className={clsx(
                "flex gap-2"
            )}>
                {
                    items.map(item => {
                        return <BreadcrumItem key={item.label} item={item} />
                    })
                }
                <li>Search result</li>
            </ul>
        </div>
    )
}