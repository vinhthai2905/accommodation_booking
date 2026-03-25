import { clsx } from "clsx"

import Registry from "./Registry"
import MenuHeader from "./MenuHeader"

export default function NavigationBar() {
    return (
        <div className={clsx(
            "flex flex-col py-3 gap-4 mx-[10%]",
            "xl:mx-[20%]"
        )}>
            <Registry />
            <MenuHeader />
        </div>
    )
}