import { clsx } from "clsx"

import BreadcrumItem from "../../components/search-filter/BreadcrumItem"

const searchNav = [
    { label: "Home page", to: "/" },
    { label: "Vietnam", to: "/vietnam" },
    { label: "TP. Ho Chi Minh", to: "/hcm" },
]

const hotelNav = [
    { label: "Trang chủ", to: "/" },
    { label: "Khách sạn", to: "/hotels" },
    { label: "Tất cả căn hộ", to: "/hotels/apartments" },
    { label: "Việt Nam", to: "/vietnam" },
    { label: "Khu vực TP. Hồ Chí Minh", to: "/vietnam/hcm/area" },
    { label: "TP. Hồ Chí Minh", to: "/vietnam/hcm" },
]

export default function Breadcrumbs({ usedFor }) {

    return (
        <div className="text-xs text-[#066ce4]">
            <ul className={clsx(
                "flex gap-2"
            )}>
                {
                    usedFor === "SearchHotelsResult"
                        ? (
                            searchNav.map(item => {
                                return <BreadcrumItem key={item.label} item={item} />
                            })
                        )
                        : (
                            hotelNav.map(item => {
                                return <BreadcrumItem key={item.label} item={item} />
                            })
                        )
                }
                <li className="text-black">
                    {
                        usedFor === "SearchHotelsResult"
                            ? " Search result"
                            : "Ưu đãi cho Diny ApartHotel - Rooftop Pool - The Manor 2 (Căn hộ) (Việt Nam)"
                    }
                </li>
            </ul>
        </div>
    )
}