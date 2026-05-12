export default function DBRoomTypeHeader({ motion }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4"
        >
            <div>
                <h1 className="mb-1 text-3xl font-bold text-gray-900">Danh sách loại phòng</h1>
                <p className="text-gray-500 text-sm">Quản lý các loại phòng của bạn tại đây.</p>
            </div>
        </motion.div>
    )
}