import { clsx } from "clsx"

import NavigationBar from "./NavigationBar"
import BookingSearchMenu from "../../features/search/BookingSearchMenu"

export default function Header() {
    return (
        <header className={clsx(
            "bg-[#003b95]",

        )}>
            <NavigationBar />
            <BookingSearchMenu />
        </header>
    )
}