import { ArrowRight } from "lucide-react"


export default function VerificationSuccessButton({ navigate }) {
    return (
        <button
            onClick={() => navigate("/")}
            className="w-full group relative flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.6)] cursor-pointer"
        >
            <span>Tiếp tục khám phá</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
    )
}