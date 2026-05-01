import HomeIcon from "../../../components/ui/HomeIcon"
import HelpIcon from "../../../components/ui/HelpIcon"
import Flag from "../../../components/ui/Flag"

import UserProfileBadge from "../../profile/section/UserProfileBadge"

import { clsx } from "clsx"

export default function BookHeader() {
    return (
        <>
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
        </>
    )
}