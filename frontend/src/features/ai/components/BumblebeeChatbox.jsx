import BumblebeeChatboxHeader from "./BumblebeeChatboxHeader"
import BumblebeeHotelCardResponses from "./BumblebeeHotelCardResponses"
import BumblebeeTyping from "./BumblebeeTyping"
import BumblebeeForm from "./BumblebeeForm"

import { clsx } from "clsx"
import { useBumblebeeForm } from "../../../hooks/ai/useBumblebeeForm"
import { useBumblebeeAutoScroll } from "../../../hooks/ai/useBumblebeeAutoScroll"
import { useClickNavigationHotel } from "../../../hooks/ai/useClickNavigationHotel"

export default function BumblebeeChatbox({
    setIsOpenBumblebee,
}) {
    const {
        register,
        handleSubmit,
        watch,
        messages,
        isBumblebeeProcessing,
        handleUserMessage
    } = useBumblebeeForm()

    const { messagesEndRef } = useBumblebeeAutoScroll(messages, isBumblebeeProcessing)

    const { handleHotelClick } = useClickNavigationHotel(setIsOpenBumblebee)

    return (
        <div className={clsx(
            "absolute bottom-20 right-0 w-96 max-w-[calc(100vw-2rem)] h-137.5 max-h-[calc(100vh-8rem)]",
            "bg-slate-900/95 text-slate-100 backdrop-blur-md",
            "border border-slate-700/50 rounded-2xl shadow-2xl",
            "flex flex-col overflow-hidden",
            "transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
        )}>
            <BumblebeeChatboxHeader
                setIsOpenBumblebee={setIsOpenBumblebee}
            />

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-slate-800">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={clsx(
                            "flex flex-col gap-1 max-w-[85%]",
                            message.sender === "user" ? "self-end items-end" : "self-start items-start"
                        )}
                    >
                        <div
                            className={clsx(
                                "px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm whitespace-pre-line",
                                message.sender === "user"
                                    ? "bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 rounded-tr-none font-medium"
                                    : "bg-slate-800 text-slate-100 border border-slate-700/60 rounded-tl-none"
                            )}
                        >
                            {message.text}
                        </div>

                        {message.hotels && message.hotels.length > 0 && (
                            <BumblebeeHotelCardResponses
                                message={message}
                                handleHotelClick={handleHotelClick}
                            />
                        )}
                    </div>
                ))}

                {isBumblebeeProcessing && (
                    <BumblebeeTyping />
                )}
                <div ref={messagesEndRef} />
            </div>

            <BumblebeeForm
                register={register}
                handleSubmit={handleSubmit}
                handleUserMessage={handleUserMessage}
                isBumblebeeProcessing={isBumblebeeProcessing}
                watch={watch}
            />
        </div>
    );
}