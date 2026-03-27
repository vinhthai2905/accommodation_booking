import { clsx } from "clsx"

import HelpIcon from "/src/components/ui/HelpIcon"
import HomeIcon from "/src/components/ui/HomeIcon"
import Flag from "/src/components/ui/Flag"


export default function SmallHeader() {

    return (
        <div className={clsx(
            "bg-[#003b95]",
        )}>
            <div className={clsx(
                "h-full",
                "flex mx-[20%] justify-between py-7 px-7",
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
        </div>
    )
}