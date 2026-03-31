import { clsx } from "clsx"
import { useContext } from "react"

import BookingSearchBar from "./BookingSearchBar"

import { HeaderContext } from "../../context/HeaderContext"


export default function BookingSearchMenu() {
    const currentPage = useContext(HeaderContext)

    return (
        <div className={clsx(
            "flex",
            "mx-[10%] flex flex-col gap-7",
            "xl:mx-[20%]"
        )}>
            {
                currentPage === true
                && (
                    <>
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
                        <BookingSearchBar />
                    </>
                )
            }
        </div>
    )
}