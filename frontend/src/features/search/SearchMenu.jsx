import { clsx } from "clsx"
import { useLocation } from "react-router"

import SearchBar from "./SearchBar"


export default function SearchMenu() {
    const url = useLocation()

    let currentPage = url.pathname.includes("searchresults")

    return (
        <div className={clsx(
            "flex",
            "mx-[10%] flex flex-col gap-7",
            "xl:mx-[20%]"
        )}>
            {
                currentPage === false
                    && (
                    <div className={clsx(
                        "flex flex-col pt-5 gap-2",
                        "sm:text-2xl"
                    )}>
                        <h1 className={clsx(
                            "font-bold text-4xl"
                        )}>
                            Tìm chỗ nghỉ tiếp theo
                        </h1>
                        <p className={clsx(
                            "font-medium"
                        )}>
                            Tìm khách sạn, chỗ nghỉ dạng nhà và nhiều hơn nữa...
                        </p>
                    </div>
                )
            }
            <SearchBar />
        </div>
    )
}