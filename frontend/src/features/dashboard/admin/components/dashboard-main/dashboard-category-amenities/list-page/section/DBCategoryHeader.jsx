export default function DBCategoryHeader({ motion }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
            <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Danh mục tiện nghi</h1>
                <p className="text-gray-500 text-sm mt-1">Quản lý các nhóm/danh mục tiện nghi cho phòng và khách sạn của bạn.</p>
            </div>
        </motion.div>
    )
}
