import { clsx } from "clsx"
import { useLocation } from "react-router"

import NavigationBar from "./NavigationBar"
import BookingSearchMenu from "../../features/search/section/BookingSearchMenu"

import { HeaderContext } from "../../context/common/HeaderContext"

export default function Header() {
    const url = useLocation()

    let currentPage = url.pathname.includes("index")
    
    return (
        <HeaderContext value={currentPage}>
            <header className={clsx(
                "bg-[#003b95]",
                "z-2000"

            )}>
                <NavigationBar />
                <BookingSearchMenu />
            </header>
        </HeaderContext>
    )
}