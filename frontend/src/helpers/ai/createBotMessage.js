export function createBotMessage(bumblebeeMutation, userMessage, setMessages) {
    bumblebeeMutation.mutate(userMessage, {
        onSuccess: (responseData) => {
            const botMsg = {
                id: Date.now() + 1,
                sender: "bot",
                text: responseData.response,
                hotels: responseData.hotels,
                timestamp: new Date()
            }
            setMessages((prev) => [...prev, botMsg])
        },
        onError: (error) => {
            console.error("Lỗi khi kết nối với AI:", error)
            const errorMsg = {
                id: Date.now() + 1,
                sender: "bot",
                text: "Rất tiếc, mình gặp sự cố kết nối. Bạn thử lại sau nhé!",
                timestamp: new Date()
            }
            setMessages((prev) => [...prev, errorMsg])
        }
    })
}