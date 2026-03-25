import { clsx } from "clsx"

import SearchBar from "./SearchBar"

export default function SearchMenu() {
    return (
        <div className={clsx(
            "mt-5",
            "mx-[10%] flex flex-col gap-7",
            "xl:mx-[20%]"
        )}>
            <div className={clsx(
                "flex flex-col gap-2",
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
            <SearchBar />
        </div>
    )
}