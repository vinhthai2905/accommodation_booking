import Header from "./Header"

import Footer from "/src/components/layout/Footer"

import { clsx } from "clsx"
import { Outlet, useLocation } from "react-router"

export default function AppLayout() {
    const location = useLocation()

    return (
        <div className={clsx(
            "min-h-screen flex flex-col"
        )}>
            {location.hash === "#map_opened" ? undefined : <Header />}
            <main className="flex-1">
                <Outlet />
            </main>
            {location.hash === "#map_opened" ? undefined : <Footer />}
        </div>
    )
}