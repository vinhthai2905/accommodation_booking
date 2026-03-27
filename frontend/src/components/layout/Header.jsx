import { clsx } from "clsx"

import NavigationBar from "./NavigationBar"
import SearchMenu from "../../features/search/SearchMenu"

export default function Header() {
    

    return (
        <header className={clsx(
            "bg-[#003b95]",

        )}>
            <NavigationBar />
            <SearchMenu />
        </header>
    )
}