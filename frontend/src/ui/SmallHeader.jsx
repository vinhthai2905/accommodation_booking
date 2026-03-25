import { clsx } from "clsx"

import HelpIcon from "./HelpIcon"
import HomeIcon from "./HomeIcon"
import Flag from "./Flag"


export default function SmallHeader() {
    return (
        <div className={clsx(
            "bg-[#003b95]",
            "h-full",
            "flex justify-between"
        )}>
            <HomeIcon />
            <div className={clsx(
                "flex items-center gap-4"
            )}>
                <div className={clsx(
                    "flex gap-8"
                )}>
                    <Flag />
                    <HelpIcon />
                </div>
            </div>
        </div>
    )
}