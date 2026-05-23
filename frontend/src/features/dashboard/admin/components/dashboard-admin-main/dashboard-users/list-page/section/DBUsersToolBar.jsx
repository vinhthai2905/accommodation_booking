import { Search } from "lucide-react"

export default function DBUsersToolBar({
    searchTerm,
    setSearchTerm,
    roles,
    selectedRoleId,
    setSelectedRoleId
}) {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-5 border-b border-gray-100 bg-white">
            <div className="relative w-full sm:w-96">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên, email, sđt..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 font-medium placeholder:font-normal"
                />
            </div>

            <div className="w-full sm:w-auto">
                <select
                    className="w-full sm:w-56 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 font-medium cursor-pointer appearance-none"
                    value={selectedRoleId}
                    onChange={(e) => setSelectedRoleId(e.target.value)}
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        backgroundPosition: `right 12px center`,
                        backgroundRepeat: `no-repeat`,
                        backgroundSize: `16px`,
                        paddingRight: `40px`
                    }}
                >
                    <option value="all">Tất cả vai trò</option>
                    {roles?.map(role => (
                        <option key={role.id_role} value={role.id_role}>
                            {role.role_name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
