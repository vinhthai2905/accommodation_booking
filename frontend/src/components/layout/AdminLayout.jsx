import AnimatedSidebarDashboard from '../ui/AnimatedSidebarDashboard'
import DashboardPanel from '../ui/DashboardPanel'
import DashboardNav from '../ui/DashboardNav'
import DashboardLogout from '../ui/DashboardLogout'

import { clsx } from 'clsx'
import { Menu, Bell } from 'lucide-react'
import { Outlet, Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'


export default function AdminLayout() {
  const location = useLocation()

  return (
    <div className={clsx(
      "flex h-screen w-full overflow-hidden",
      "font-sans text-gray-100 bg-gray-900"
    )}>

      {/* Sidebar */}
      <AnimatedSidebarDashboard>
        <DashboardPanel
          to={location.pathname}
          panel={"Admin Panel"}
        />

        <DashboardNav
          location={location}
        />
        <DashboardLogout />

      </AnimatedSidebarDashboard>

      {/* Main Content */}
      <main className={clsx("relative flex flex-col flex-1 h-screen overflow-hidden")}>
        {/* Header */}
        <header className={clsx(
          "sticky top-0 z-30",
          "flex items-center justify-between h-16 px-6",
          "bg-gray-800/50 backdrop-blur-md border-b border-gray-700"
        )}>

          <div className={clsx("flex-1")} /> {/* Spacer */}

          <div className={clsx("flex items-center gap-4")}>
            <button className={clsx(
              "relative p-2",
              "text-gray-400 hover:text-white transition-colors"
            )}>
              <Bell size={20} />
              <span className={clsx("absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full")}></span>
            </button>
            <div className={clsx(
              "h-8 w-8 p-0.5 rounded-full",
              "bg-linear-to-tr from-blue-500 to-purple-500"
            )}>
              <div className={clsx(
                "flex items-center justify-center w-full h-full",
                "bg-gray-800 rounded-full text-sm font-bold"
              )}>
                A
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className={clsx("flex-1 overflow-y-auto p-4 lg:p-8")}>
          <div className={clsx("max-w-7xl mx-auto")}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
