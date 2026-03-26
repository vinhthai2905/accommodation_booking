import { clsx } from "clsx"

import NavigationBar from "./NavigationBar"
import SearchMenu from "./SearchMenu"

export default function Header({ userFor }) {
    return (
        <header className={clsx(
            "bg-[#003b95]",

        )}>
            <NavigationBar />
            {userFor === "user" && <SearchMenu />}
        </header>
    )
}