import { HelpCircle } from "lucide-react"

export default function OnboardingHeader({ user, navigate, clearAuthUserState }) {
    return (
        <header className="bg-[#003580] text-white py-4 px-6 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-6">
                <span className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigate("/")}>
                    Booking.com
                </span>
                <span className="hidden md:inline-block px-2.5 py-0.5 bg-blue-700/60 rounded text-xs border border-blue-400/30 uppercase tracking-widest font-semibold">
                    Đối tác
                </span>
            </div>
            
            <div className="flex items-center gap-6 text-sm">
                <span className="hidden lg:flex items-center gap-1.5 opacity-90 hover:opacity-100 cursor-pointer">
                    <HelpCircle size={16} /> Trợ giúp
                </span>
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="font-semibold text-white">{user?.email || "Đối tác"}</p>
                        <p className="text-xs text-blue-200">Đà Nẵng, Việt Nam</p>
                    </div>
                    <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold border-2 border-blue-400">
                        {(user?.email?.[0] || "P").toUpperCase()}
                    </div>
                </div>
                <button 
                    onClick={clearAuthUserState}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 transition-colors text-white font-medium rounded text-xs"
                >
                    Đăng xuất
                </button>
            </div>
        </header>
    )
}
