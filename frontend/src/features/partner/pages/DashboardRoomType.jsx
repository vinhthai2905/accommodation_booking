import { useState } from "react"
import { motion } from "framer-motion"
import { clsx } from "clsx"
import { Plus, Search, Filter, MoreHorizontal, ChevronLeft, ChevronRight, BedDouble } from "lucide-react"

import { usePartnerRoomTypes } from "../../../hooks/dashboard/partner/usePartnerRoomTypes"

export default function DashboardRoomType() {
    const { data: roomTypes, isPending, isError, error } = usePartnerRoomTypes()
    const [searchTerm, setSearchTerm] = useState("")

    if (isPending) {
        return (
            <div className="flex justify-center items-center h-[60vh] text-gray-800">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-4 text-lg">Đang tải dữ liệu loại phòng...</span>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="text-red-600 p-6 bg-red-50 rounded-xl border border-red-200 shadow-sm max-w-2xl mx-auto mt-10">
                <h3 className="text-xl font-bold mb-2">Đã xảy ra lỗi</h3>
                <p>{error.message || "Không thể tải danh sách loại phòng. Vui lòng thử lại sau."}</p>
            </div>
        )
    }

    const filteredRooms = roomTypes?.filter(room => 
        room.type_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            {/* Page Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4"
            >
                <div>
                    <h1 className="mb-1 text-3xl font-bold text-gray-900">Room Types List</h1>
                    <p className="text-gray-500 text-sm">Manage your hotel's available room configurations.</p>
                </div>
            </motion.div>

            {/* Table Container */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col flex-1 min-h-0 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm w-full"
            >
                {/* Table Toolbar */}
                <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200">
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white border border-gray-300 text-gray-900 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium w-full md:w-auto">
                            <Filter size={16} />
                            Category
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium w-full md:w-auto">
                            Status
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-md shadow-blue-500/20 w-full md:w-auto whitespace-nowrap">
                            <Plus size={16} />
                            Add New
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[13px] text-gray-500 border-b border-gray-200 bg-gray-50/50">
                                <th className="p-4 w-12 text-center">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                </th>
                                <th className="p-4 font-medium whitespace-nowrap">Room Name</th>
                                <th className="p-4 font-medium whitespace-nowrap">Capacity</th>
                                <th className="p-4 font-medium whitespace-nowrap">Total Rooms</th>
                                <th className="p-4 font-medium whitespace-nowrap">Price</th>
                                <th className="p-4 font-medium whitespace-nowrap">Status</th>
                                <th className="p-4 font-medium text-center whitespace-nowrap">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {filteredRooms.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="p-12 text-center text-gray-500">
                                        No room types found matching your search.
                                    </td>
                                </tr>
                            ) : (
                                filteredRooms.map((room) => (
                                    <tr key={room.id_room_type} className="hover:bg-gray-50/80 transition-colors group">
                                        <td className="p-4 text-center">
                                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-md bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                                                    <BedDouble size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{room.type_name}</p>
                                                    <p className="text-[11px] text-gray-500 mt-0.5">ID: {room.id_room_type}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">
                                            {room.max_capacity} Guests
                                        </td>
                                        <td className="p-4">
                                            <span className={clsx(
                                                "text-[13px] font-medium",
                                                room.total_rooms > 5 ? "text-gray-600" : "text-amber-600"
                                            )}>
                                                {room.total_rooms} {room.total_rooms <= 5 && room.total_rooms > 0 && "Low Stock"}
                                                {room.total_rooms === 0 && <span className="text-rose-600">Out of Stock</span>}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-900 font-medium">
                                            {parseInt(room.price).toLocaleString('vi-VN')} đ
                                        </td>
                                        <td className="p-4">
                                            <span className={clsx(
                                                "inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium",
                                                room.total_rooms > 0 
                                                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                                                    : "bg-rose-50 text-rose-600 border border-rose-200"
                                            )}>
                                                {room.total_rooms > 0 ? "Published" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                                                <MoreHorizontal size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[13px] text-gray-500 gap-4">
                    <div className="flex items-center gap-2">
                        <span>Result 1-{Math.min(10, filteredRooms.length)} of {filteredRooms.length}</span>
                        <select className="bg-white border border-gray-300 text-gray-700 rounded outline-none px-2 py-1 ml-2 focus:border-blue-500">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50">
                            <ChevronLeft size={14} />
                            <span>Previous</span>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-blue-600 text-blue-600 bg-blue-50 font-medium">
                            1
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-600 hover:bg-gray-50 transition-colors">
                            2
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-600 hover:bg-gray-50 transition-colors">
                            3
                        </button>
                        <span className="px-1 text-gray-400">...</span>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                            <span>Next</span>
                            <ChevronRight size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}