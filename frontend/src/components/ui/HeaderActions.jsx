import { clsx } from "clsx"

import HomeIcon from "./HomeIcon"
import HelpIcon from "./HelpIcon"
import Flag from "./Flag"

export default function HeaderActions() {
    return (
        <>
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
        </>
    )
}