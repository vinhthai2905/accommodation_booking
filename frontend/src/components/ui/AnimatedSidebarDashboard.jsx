import { clsx } from "clsx"
import { motion } from "framer-motion"

export default function AnimatedSidebarDashboard({ children, className}) {
    
    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0, duration: 0.6 }}
            className={clsx(
                "w-64 flex flex-col shrink-0 z-50",
                className || "bg-gray-800 border-r border-gray-700 text-gray-100"
            )}
        >
            {children}
        </motion.aside>
    )
}