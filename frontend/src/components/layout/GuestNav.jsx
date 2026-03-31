import { clsx } from "clsx"

import HelpIcon from "/src/components/ui/HelpIcon"
import HomeIcon from "/src/components/ui/HomeIcon"
import Flag from "/src/components/ui/Flag"
import ButtonLink from "/src/components/ui/ButtonLink"

import { Link } from "react-router"

export default function GuestNav() {
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
                <Link to={"/partner"}>
                    <span className={clsx("hover:cursor-pointer hover:underline text-white")}>Đăng chỗ nghỉ của quý vị</span>
                </Link>
                <ButtonLink title="Đăng nhập" to={"/auth/sign-in"} />
                <ButtonLink title="Đăng ký" to={"/auth/sign-up"} />
            </div>
        </div>
    )
}