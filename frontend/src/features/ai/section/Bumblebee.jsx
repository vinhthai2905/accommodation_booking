import BumblebeeChatbox from "../components/BumblebeeChatbox"
import BumblebeeForm from "../components/BumblebeeForm"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router"
import { MessageCircle, X } from "lucide-react"
import axios from "axios"


export default function Bumblebee() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Xin chào! Mình là Bumblebee - trợ lý ảo du lịch của bạn. 🐝\n\nMình có thể gợi ý các khách sạn tốt nhất tại Đà Nẵng dựa trên giá cả, số lượng tiện nghi và khoảng cách đến biển.\n\nHãy thử hỏi mình câu gì đó như: 'Tìm khách sạn giá rẻ gần biển' nhé!",
            timestamp: new Date()
        }
    ]);
    const [isThinking, setIsThinking] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL || "";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isThinking]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim() || isThinking) return;

        const userText = message;
        setMessage("");

        // Append user message
        const userMsg = {
            id: Date.now(),
            sender: "user",
            text: userText,
            timestamp: new Date()
        };
        setMessages((prev) => [...prev, userMsg]);
        setIsThinking(true);

        try {
            // Call the AI chat endpoint on our backend
            const response = await axios.post(`${apiUrl}/api/ai/chat`, {
                message: userText
            });

            const botMsg = {
                id: Date.now() + 1,
                sender: "bot",
                text: response.data.response,
                hotels: response.data.hotels,
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Lỗi khi kết nối với AI:", error);
            const errorMsg = {
                id: Date.now() + 1,
                sender: "bot",
                text: "Rất tiếc, mình gặp sự cố kết nối. Bạn thử lại sau nhé!",
                timestamp: new Date()
            };
            setMessages((prev) => [...prev, errorMsg]);
        } finally {
            setIsThinking(false);
        }
    };

    const handleHotelClick = (slug, id_hotel) => {
        setIsOpen(false);
        navigate(`/hotel/${slug}/${id_hotel}`);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 font-sans">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-linear-to-tr from-amber-500 to-yellow-400 text-slate-900 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer border border-yellow-300/30"
                title="Bumblebee AI Assistant"
            >
                {isOpen ? (
                    <X className="w-6 h-6 stroke-[2.5]" />
                ) : (
                    <div className="relative">
                        <MessageCircle className="w-7 h-7 fill-slate-900 stroke-[1.5]" />
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-ping"></span>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <>
                    <BumblebeeChatbox
                        setIsOpen={setIsOpen}
                        messages={messages}
                        handleHotelClick={handleHotelClick}
                        isThinking={isThinking}
                        messagesEndRef={messagesEndRef}
                        handleSendMessage={handleSendMessage}
                        message={message}
                        setMessage={setMessage}

                    />
                   
                </>
            )}


        </div>
    )
}
