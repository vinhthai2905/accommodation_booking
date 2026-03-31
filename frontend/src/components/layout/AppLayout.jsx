import Header from "./Header"

import Footer from "/src/components/layout/Footer"

import { clsx } from "clsx"
import { Outlet } from "react-router"

export default function AppLayout() {
    return (
        <div className={clsx(
            "min-h-screen flex flex-col"
        )}>
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}