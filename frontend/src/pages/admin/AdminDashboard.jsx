import AnimatedSidebarDashboard from '../../components/ui/AnimatedSidebarDashboard'
import DashboardPanel from '../../components/ui/DashboardPanel'
import DashboardNav from '../../features/dashboard/admin/ui/dashboard-nav/DashboardNav'
import AdminDashboardProfile from '../../features/dashboard/admin/section/AdminDashboardProfile'
import { clsx } from 'clsx'
import { Menu, Bell } from 'lucide-react'
import { Outlet, Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminDashboard() {
  const location = useLocation()

  return (
    <div className={clsx(
      "flex h-screen w-full overflow-hidden",
      "font-sans text-gray-900 bg-white"
    )}>

      <AnimatedSidebarDashboard className="bg-white border-r border-gray-200 text-gray-900">
        <DashboardPanel
          to={location.pathname}
          panel={"Admin Panel"}
        />

        <DashboardNav
          location={location}
        />

      </AnimatedSidebarDashboard>

      {/* Main Content */}
      <main className={clsx("relative flex flex-col flex-1 h-screen overflow-hidden")}>
        {/* Header */}
        <header className={clsx(
          "sticky top-0 z-30",
          "flex items-center justify-between h-16 px-6",
          "bg-white/80 backdrop-blur-md border-b border-gray-200"
        )}>

          <div className={clsx("flex-1")} /> {/* Spacer */}

          <div className={clsx("flex items-center gap-4")}>
            <button className={clsx(
              "relative p-2",
              "text-gray-500 hover:text-[#003b95] transition-colors"
            )}>
              <Bell size={20} />
              <span className={clsx("absolute top-1.5 right-1.5 w-2 h-2 bg-[#003b95] rounded-full")}></span>
            </button>
            <AdminDashboardProfile />
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className={clsx("flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-8")}>
          <div className={clsx("max-w-7xl mx-auto")}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
