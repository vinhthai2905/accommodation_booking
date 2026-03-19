import { clsx } from "clsx"

import HelpIcon from "./HelpIcon"
import HomeIcon from "./HomeIcon"
import Flag from "./Flag"


export default function Header() {
    return (
        <header className={clsx(
            "bg-[#003b95]",
            "h-16"
        )}>
            <div className={clsx(
                "h-full",
                "flex justify-around"
            )}>
                <div className={clsx(
                    "flex items-center"
                )}>
                    <HomeIcon />
                </div>
                <div className={clsx(
                    "flex items-center gap-4"
                )}>
                    <div className={clsx(
                        "flex gap-8"
                    )}>
                        <Flag />
                        <HelpIcon />
                    </div>
                    <a>
                        <span className="text-white">Đăng chỗ nghĩ của quý vị</span>
                    </a>
                    <a className={clsx(
                        "bg-white"
                    )}>
                        <span className="text-[rgb(0,108,228)]">
                            Đăng nhập
                        </span>
                    </a>
                    <a className={clsx(
                        "bg-white"
                    )}>
                        <span className="text-[#006ce4]">
                            Đăng ký
                        </span>
                    </a>
                </div>
            </div>
        </header>
    )
}