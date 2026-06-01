import { clsx } from "clsx"
import { Filter, Plus, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

export default function DBWardsToolBar({ 
    searchTerm, 
    setSearchTerm, 
    cities, 
    selectedCityId, 
    setSelectedCityId 
}) {
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const selectedCity = cities?.find(c => String(c.id_city) === String(selectedCityId))

    return (
        <div
            className={clsx(
                "flex flex-col items-center justify-between gap-4 p-4",
                "border-b border-gray-200",
                "md:flex-row"
            )}
        >
            <div className="relative w-full md:w-80">
                <div
                    className={clsx(
                        "pointer-events-none absolute inset-y-0 left-0",
                        "flex items-center pl-3"
                    )}
                >
                    <Search size={18} className="text-gray-400" />
                </div>

                <input
                    type="text"
                    placeholder="Tìm kiếm phường..."
                    className={clsx(
                        "w-full rounded-lg px-4 py-2.5 pl-10 outline-none",
                        "border border-gray-300 bg-white",
                        "text-sm text-gray-900",
                        "transition-colors",
                        "focus:border-blue-500 focus:ring-blue-500"
                    )}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex w-full items-center gap-3 md:w-auto relative" ref={dropdownRef}>
                <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors"
                >
                    <Filter size={16} />
                    <span>{selectedCity ? selectedCity.city_name : "Thành phố"}</span>
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-auto left-0 md:left-auto md:right-0 top-full mt-2 z-50 w-56 rounded-xl bg-white p-1.5 shadow-[0_12px_30px_-10px_rgba(0,0,0,0.2)] border border-gray-200">
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCityId("all")
                                setIsDropdownOpen(false)
                            }}
                            className={clsx(
                                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer",
                                selectedCityId === "all"
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            Tất cả thành phố
                        </button>
                        <div className="my-1 h-px bg-gray-100" />
                        {cities?.map((cat) => (
                            <button
                                key={cat.id_city}
                                type="button"
                                onClick={() => {
                                    setSelectedCityId(String(cat.id_city))
                                    setIsDropdownOpen(false)
                                }}
                                className={clsx(
                                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-semibold cursor-pointer",
                                    String(selectedCityId) === String(cat.id_city)
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                {cat.city_name}
                            </button>
                        ))}
                    </div>
                )}

                <button 
                    onClick={() => navigate("/admin/dashboard/wards/new")}
                    className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 cursor-pointer transition-colors"
                >
                    <Plus size={16} />
                    Thêm phường
                </button>
            </div>
        </div>
    )
}
