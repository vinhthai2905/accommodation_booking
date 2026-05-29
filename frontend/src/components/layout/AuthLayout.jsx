import SmallHeader from "./SmallHeader"

import { Outlet, useLocation } from "react-router"

export default function AuthLayout() {
    const url = useLocation()

    const isPartner = url.pathname.includes("/auth/partner")

    return (
        <>
            <SmallHeader />
            <Outlet context={isPartner} />
        </>
    )
}