import { useRef, useEffect } from "react"

export function useBumblebeeAutoScroll(messages, isBumblebeeProcessing) {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isBumblebeeProcessing])

    return {
        messagesEndRef
    }
}