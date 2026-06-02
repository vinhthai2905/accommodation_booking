import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"

export default function HotelReviewLoading() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-6">
                    <ArrowLeft size={16} /> Quay lại
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>

                    <div className="p-6">
                        {/* Rating Section Skeleton */}
                        <div className="mb-8 flex flex-col items-center animate-pulse">
                            <div className="h-5 bg-gray-200 rounded w-64 mb-4"></div>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                ))}
                            </div>
                            <div className="h-4 bg-gray-200 rounded w-24 mt-4"></div>
                        </div>

                        {/* Comment Section Skeleton */}
                        <div className="mb-6 animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="w-full h-32 bg-gray-100 rounded-xl border border-gray-200"></div>
                        </div>

                        {/* Action Buttons Skeleton */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 animate-pulse">
                            <div className="w-20 h-10 bg-gray-200 rounded-lg"></div>
                            <div className="w-32 h-10 bg-gray-300 rounded-lg"></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
