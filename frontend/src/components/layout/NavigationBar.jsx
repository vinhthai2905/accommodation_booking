import { clsx } from "clsx"

import HeaderNav from "./HeaderNav"
import ServiceNav from "./ServiceNav"

import { useContext } from "react"
import { HeaderContext } from "../../context/HeaderContext"

export default function NavigationBar() {
    const currentPage = useContext(HeaderContext)

    return (
        <div className={clsx(
            "flex flex-col gap-2",
            "mx-[10%] xl:mx-[20%]",
            currentPage === true ? "py-3" : "py-4"
        )}>
            <HeaderNav />
            {currentPage === true ? <ServiceNav /> : ""}
        </div>
    )
}