import { clsx } from "clsx";
import { MessageCircle, Bot } from "lucide-react";
import BumblebeeHotelCardResponses from "../components/BumblebeeHotelCardResponses";
import BumblebeeTyping from "../components/BumblebeeTyping";
import BumblebeeForm from "../components/BumblebeeForm";

import { useBumblebeeForm } from "../../../hooks/ai/useBumblebeeForm";
import { useBumblebeeAutoScroll } from "../../../hooks/ai/useBumblebeeAutoScroll";
import { useClickNavigationHotel } from "../../../hooks/ai/useClickNavigationHotel";

export default function BumblebeePage() {
    const {
        register,
        handleSubmit,
        watch,
        messages,
        isBumblebeeProcessing,
        handleUserMessage,
    } = useBumblebeeForm();

    const { messagesEndRef } = useBumblebeeAutoScroll(messages, isBumblebeeProcessing);
    
    // For full page we don't need setIsOpenBumblebee
    const mockSetIsOpen = () => {};
    const { handleHotelClick } = useClickNavigationHotel(mockSetIsOpen);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center py-8 px-4 font-sans text-slate-100">
            
            {/* Header / Hero */}
            <div className="w-full max-w-4xl flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-linear-to-tr from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                        <Bot className="w-8 h-8 text-slate-900" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-amber-400 to-yellow-200">
                            Bumblebee AI
                        </h1>
                        <p className="text-slate-400 text-sm">Trợ lý du lịch trực tuyến</p>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="w-full max-w-4xl flex-1 bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
                
                <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scrollbar-thin scrollbar-thumb-slate-800">
                    {messages.length === 1 && (
                        <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                            <MessageCircle className="w-12 h-12 stroke-[1.5] opacity-50" />
                            <p className="text-center max-w-md">
                                Xin chào! Mình là Bumblebee, trợ lý AI của bạn. Hãy nói cho mình biết bạn đang tìm kiếm khách sạn như thế nào nhé!
                            </p>
                        </div>
                    )}

                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={clsx(
                                "flex flex-col gap-2 max-w-[90%] md:max-w-[80%]",
                                message.sender === "user" ? "self-end items-end" : "self-start items-start"
                            )}
                        >
                            <div
                                className={clsx(
                                    "px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-line",
                                    message.sender === "user"
                                        ? "bg-linear-to-r from-amber-500 to-yellow-400 text-slate-950 rounded-tr-none font-medium"
                                        : "bg-slate-800/80 text-slate-100 border border-slate-700/60 rounded-tl-none"
                                )}
                            >
                                {message.text}
                            </div>

                            {message.hotels && message.hotels.length > 0 && (
                                <div className="mt-2 w-full">
                                    <BumblebeeHotelCardResponses
                                        message={message}
                                        handleHotelClick={handleHotelClick}
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    {isBumblebeeProcessing && (
                        <div className="self-start items-start">
                            <BumblebeeTyping />
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-slate-900/80 border-t border-slate-800">
                    <div className="max-w-3xl mx-auto">
                        <BumblebeeForm
                            register={register}
                            handleSubmit={handleSubmit}
                            handleUserMessage={handleUserMessage}
                            isBumblebeeProcessing={isBumblebeeProcessing}
                            watch={watch}
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
