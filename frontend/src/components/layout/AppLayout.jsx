import Header from "./Header"
import Footer from "/src/components/layout/Footer"
import Bumblebee from "/src/features/ai/section/Bumblebee"
import { clsx } from "clsx"
import { Outlet, useLocation } from "react-router"

export default function AppLayout() {
    const location = useLocation()

    const isBumblebeeVisible = location.pathname.startsWith("/searchresults") || location.pathname.startsWith("/hotel")

    return (
        <div className={clsx(
            "min-h-screen flex flex-col"
        )}>
            {location.hash === "#map_opened" ? undefined : <Header />}
            <main className="flex-1">
                <Outlet />
            </main>
            {isBumblebeeVisible && <Bumblebee />}
            {location.hash === "#map_opened" ? undefined : <Footer />}
        </div>
    )
}