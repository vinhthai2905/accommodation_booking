import Header from "./Header"
import Footer from "./Footer"

import { clsx } from "clsx"

import { Outlet } from "react-router"

export default function AppLayout() {
    return (
        <div className={clsx(
            "min-h-screen flex flex-col"
        )}>
            <Header />
            <main className="">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}