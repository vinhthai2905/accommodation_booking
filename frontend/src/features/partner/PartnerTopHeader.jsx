import { Link } from "react-router"
import clsx from "clsx"

import HomeIcon from "../../ui/HomeIcon"
import Flag from "../../ui/Flag"
import ButtonLink from "../../ui/ButtonLink"

export default function PartnerTopHeader() {
    return (
        <div className={clsx(
            "w-full h-20",
            "bg-[#003b95]",
            "flex items-center justify-center",
            "px-6"
        )}>
            <div className={clsx(
                "w-full max-w-300",
                "flex justify-between items-center"
            )}>
                <HomeIcon />

                <div className={clsx(
                    "flex items-center",
                    "gap-4"
                )}>
                    <Flag />

                    <Link to="/partner/auth/sign-up">
                        <span className={clsx(
                            "text-white",
                            "hover:underline hover:cursor-pointer"
                        )}>
                            Đã là đối tác?
                        </span>
                    </Link>

                    <ButtonLink
                        title="Đăng nhập"
                        to="/partner/auth/sign-in"
                    />

                    <ButtonLink
                        title="Trợ giúp"
                        to="/partner/help"
                    />
                </div>
            </div>
        </div>
    )
}