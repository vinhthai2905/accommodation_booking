import { Link } from "react-router"
import { motion } from "framer-motion"
import { MapPinOff, ArrowLeft } from "lucide-react"

export default function Page404Redirect() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-60"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-sky-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-60"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-[128px] opacity-60"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center text-center max-w-lg w-full bg-white/80 backdrop-blur-xl border border-gray-100 p-10 rounded-4xl shadow-xl"
            >
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                    className="mb-8 relative"
                >
                    <div className="absolute inset-0 bg-blue-200 rounded-full blur-2xl opacity-50"></div>
                    <div className="w-24 h-24 bg-linear-to-tr from-blue-700 to-blue-500 rounded-3xl flex items-center justify-center shadow-lg relative z-10 transform -rotate-6">
                        <MapPinOff size={48} className="text-white drop-shadow-md" strokeWidth={1.5} />
                    </div>
                </motion.div>

                <h1 className="text-7xl font-black text-transparent bg-clip-text bg-linear-to-br from-blue-800 to-blue-500 mb-2 drop-shadow-sm">
                    404
                </h1>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Không tìm thấy trang
                </h2>
                
                <p className="text-gray-600 mb-8 leading-relaxed text-sm sm:text-base">
                    Chúng tôi đã tìm kiếm khắp nơi, nhưng trang bạn đang tìm dường như không tồn tại hoặc đã bị gỡ bỏ.
                </p>

                <Link to="/" className="group relative inline-flex items-center justify-center w-full sm:w-auto overflow-hidden rounded-xl p-4 px-8 font-medium text-white bg-[#003b95] hover:bg-blue-800 transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
                    <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="relative z-10">Quay về trang chủ</span>
                </Link>
            </motion.div>
        </div>
    )
}
