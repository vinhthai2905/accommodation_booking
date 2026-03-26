import { clsx } from "clsx"

import HelpIcon from "./HelpIcon"
import HomeIcon from "./HomeIcon"
import Flag from "./Flag"
import ButtonLink from "./ButtonLink"


export default function Registry() {
    return (
        <div className={clsx(
            "h-full",
            "flex justify-between mx-[0.5%]"
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
                <a>
                    <span className={clsx("hover:cursor-pointer hover:underline text-white")}>Đăng chỗ nghỉ của quý vị</span>
                </a>
                <ButtonLink title="Đăng nhập" to={"/sign-in"} />
                <ButtonLink title="Đăng ký" to={"/sign-up"} />
            </div>
        </div>
    )
}