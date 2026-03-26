import { Outlet, useLocation } from "react-router"
import SmallHeader from "./SmallHeader"

import { UserContext } from "../features/UserContext"

export default function AuthLayout() {

    const url = useLocation()

    const userType = url.pathname.includes("/auth/partner") ? "partner" : "user"

    return (
        <>
            <UserContext value={userType}>
                <Outlet />
            </UserContext>

        </>
    )
}