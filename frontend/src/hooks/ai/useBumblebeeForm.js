import { useState } from "react"
import { useForm } from "react-hook-form"
import { useBumblebeeMutation } from "./useBumblebeeMutation"
import { createUserMessage } from "../../helpers/ai/createUserMessage"
import { createBotMessage } from "../../helpers/ai/createBotMessage"

export function useBumblebeeForm() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: "bot",
            text: "Xin chào! Mình là Bumblebee - trợ lý ảo du lịch của bạn. 🐝\n\nMình có thể gợi ý các khách sạn tốt nhất tại Đà Nẵng dựa trên giá cả, số lượng tiện nghi và khoảng cách đến biển.\n\nHãy thử hỏi mình câu gì đó như: 'Tìm khách sạn giá rẻ gần biển' nhé!",
            timestamp: new Date()
        }
    ])

    const { register, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            userMessageToProcess: ""
        }
    })

    const bumblebeeMutation = useBumblebeeMutation()

    const handleUserMessage = (userMessageInput) => {
        const userMessage = createUserMessage(
            userMessageInput, 
            bumblebeeMutation, 
            reset, 
            setMessages
        )

        createBotMessage(bumblebeeMutation, userMessage, setMessages)
    }

    return {
        register,
        handleSubmit,
        watch,
        messages,
        setMessages,
        isBumblebeeProcessing: bumblebeeMutation.isPending,
        handleUserMessage
    }
}