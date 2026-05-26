import BumblebeeChatbox from "../components/BumblebeeChatbox"

import { useState } from "react"
import { MessageCircle, X } from "lucide-react"

export default function Bumblebee() {
    const [isOpenBumblebee, setIsOpenBumblebee] = useState(false)

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            <button
                onClick={() => setIsOpenBumblebee(!isOpenBumblebee)}
                className="w-14 h-14 bg-linear-to-tr from-amber-500 to-yellow-400 text-slate-900 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-yellow-300/30"
                title="Bumblebee AI Assistant"
            >
                {isOpenBumblebee ? (
                    <X className="w-6 h-6 stroke-[2.5]" />
                ) : (
                    <div className="relative">
                        <MessageCircle className="w-7 h-7 fill-slate-900 stroke-[1.5]" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-ping"></span>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpenBumblebee && (
                <>
                    <BumblebeeChatbox
                        setIsOpenBumblebee={setIsOpenBumblebee}
                    />

                </>
            )}


        </div>
    )
}
