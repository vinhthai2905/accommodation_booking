import { Link } from "react-router"
import clsx from "clsx"

import HomeIcon from "/src/components/ui/HomeIcon"
import Flag from "/src/components/ui/Flag"
import ButtonLink from "/src/components/ui/ButtonLink"

export default function PartnerLandingHeader() {
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

                    <Link to="/auth/partner/sign-in">
                        <span className={clsx(
                            "text-white",
                            "hover:underline hover:cursor-pointer"
                        )}>
                            Đã là đối tác?
                        </span>
                    </Link>

                    <ButtonLink
                        title="Đăng ký"
                        to="/auth/partner/sign-up"
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