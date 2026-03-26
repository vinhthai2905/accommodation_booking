import { clsx } from "clsx"

import AuthHeader from "./AuthHeader"
import MenuHeader from "./MenuHeader"

export default function NavigationBar() {
    return (
        <div className={clsx(
            "flex flex-col pt-3 gap-2 mx-[10%]",
            "xl:mx-[20%]"
        )}>
            <AuthHeader />
            <MenuHeader />
        </div>
    )
}