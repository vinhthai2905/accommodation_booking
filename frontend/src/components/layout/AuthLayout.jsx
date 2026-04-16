import SmallHeader from "./SmallHeader"

import { Outlet, useLocation } from "react-router"

export default function AuthLayout() {
    const url = useLocation()

    const userType = url.pathname.includes("/auth/partner") ? "partner" : "user"

    return (
        <>
            <SmallHeader />
            <Outlet context={userType} />
        </>
    )
}