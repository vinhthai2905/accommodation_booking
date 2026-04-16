import HelpIcon from "/src/components/ui/HelpIcon"
import Flag from "/src/components/ui/Flag"

import { clsx } from "clsx"

export default function HeaderUtilities() {
    return (
        <div className={clsx(
            "flex gap-8"
        )}>
            <Flag />
            <HelpIcon />
        </div>
    )
}