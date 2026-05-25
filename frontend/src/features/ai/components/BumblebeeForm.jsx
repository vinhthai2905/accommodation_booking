import { clsx } from "clsx"
import { Send } from "lucide-react"

export default function BumblebeeForm({ handleSendMessage, message, setMessage, isThinking }) {
    return (
        <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-800/80 bg-slate-950/60 flex gap-2"
        >
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                disabled={isThinking}
                className={clsx(
                    "flex-1 bg-slate-800 border border-slate-700/70 rounded-xl px-3 py-2 text-xs text-slate-100",
                    "placeholder-slate-500 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/80",
                    "disabled:opacity-50"
                )}
            />
            <button
                type="submit"
                disabled={!message.trim() || isThinking}
                className={clsx(
                    "bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 p-2 rounded-xl",
                    "hover:from-amber-400 hover:to-yellow-300 hover:scale-105 active:scale-95",
                    "transition-all duration-200 flex items-center justify-center cursor-pointer",
                    "disabled:opacity-40 disabled:hover:scale-100"
                )}
            >
                <Send className="w-4 h-4 stroke-2" />
            </button>
        </form>
    )
}