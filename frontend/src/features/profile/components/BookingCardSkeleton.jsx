
export default function BookingCardSkeleton({ motion }) {
    return (
        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse flex">
                    <div className="w-44 h-44 bg-gray-200 shrink-0" />
                    <div className="flex-1 p-5 flex flex-col gap-3">
                        <div className="h-3 w-32 bg-gray-200 rounded-full" />
                        <div className="h-5 w-56 bg-gray-200 rounded-full" />
                        <div className="h-3 w-44 bg-gray-100 rounded-full" />
                        <div className="mt-auto grid grid-cols-4 gap-3">
                            {[...Array(4)].map((_, j) => <div key={j} className="h-8 bg-gray-100 rounded-lg" />)}
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    )
}