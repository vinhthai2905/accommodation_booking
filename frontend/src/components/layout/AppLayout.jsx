import Header from "./Header"

import Footer from "/src/components/layout/Footer"

import { clsx } from "clsx"
import { Outlet } from "react-router"

import { AuthUserContext } from "../../context/AuthUserContext"
import { useContext, useEffect } from "react"

export default function AppLayout() {
    // const { fetchUserState } = useContext(AuthUserContext)

    // useEffect(() => {
    //     const accessToken = localStorage.getItem("access_token")

    //     if (!accessToken) return

    //     fetchUserState()
        
    // }, [])

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