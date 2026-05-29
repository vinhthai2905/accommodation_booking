export default function BumblebeeTyping() {
    return (
        <div className="flex gap-1.5 p-2.5 bg-slate-800 border border-slate-700/60 rounded-2xl rounded-tl-none self-start items-center">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
        </div>
    )
}