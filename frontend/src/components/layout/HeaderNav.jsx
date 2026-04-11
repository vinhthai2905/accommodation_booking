import HomeIcon from "/src/components/ui/HomeIcon"
import HeaderUltilities from "./HeaderUltilities"
import GuestNav from "./GuestNav"
import UserProfileBadge from "./UserProfileBadge"

import { clsx } from "clsx"
import { useContext } from "react"

import { AuthUserContext } from "../../context/AuthUserContext"


export default function HeaderNav() {
    const authValue = useContext(AuthUserContext)

    return (
        <div className={clsx(
            "h-full",
            "flex justify-between mx-[0.5%]"
        )}>
            <HomeIcon />
            <div className={clsx(
                "flex items-center gap-4"
            )}>
                <HeaderUltilities />
                {authValue.isAuthenticated ? <UserProfileBadge /> : <GuestNav />}
            </div>
        </div>
    )
}