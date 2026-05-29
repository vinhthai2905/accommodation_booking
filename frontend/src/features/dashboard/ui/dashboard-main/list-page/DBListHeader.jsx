import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router"

import { motion } from "framer-motion"

export default function DBListHeader({ listLabel, instructionLabel }) {
    const navigate = useNavigate()

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4"
        >
            <div className="flex flex-col items-start gap-2">
                <div>
                    <h1 className="mb-1 text-3xl font-bold text-gray-900">{listLabel}</h1>
                    <p className="text-gray-500 text-sm">{instructionLabel}</p>
                </div>
            </div>
        </motion.div>
    )
}
