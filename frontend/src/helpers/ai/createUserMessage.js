export function createUserMessage(userMessageInput, bumblebeeMutation, reset, setMessages) {
    const userMessage = userMessageInput.userMessageToProcess
    if (!userMessage || !userMessage.trim() || bumblebeeMutation.isPending) return

    reset({ userMessageToProcess: "" })

    const userMsg = {
        id: Date.now(),
        sender: "user",
        text: userMessage,
        timestamp: new Date()
    }
    setMessages((prev) => [...prev, userMsg])

    return userMessage
}