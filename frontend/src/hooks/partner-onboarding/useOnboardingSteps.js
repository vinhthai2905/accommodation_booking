import { useState } from "react"
import toast from "react-hot-toast"

const STEPS = [
    { id: 1, label: "Thông tin cơ bản" },
    { id: 2, label: "Cài đặt chỗ nghỉ" },
    { id: 3, label: "Thông tin pháp lý" }
]

export function useOnboardingSteps(methods) {
    const [currentStep, setCurrentStep] = useState(1)
    const [channelManager, setChannelManager] = useState("no")
    
    const { trigger, getValues } = methods

    const validateStep = async () => {
        let isStepValid = false
        if (currentStep === 1) {
            isStepValid = await trigger(["hotel_name", "id_hotel_type", "phone_number"])
        } else if (currentStep === 2) {
            isStepValid = await trigger(["id_ward", "address"])
        } else if (currentStep === 3) {
            isStepValid = await trigger(["document_name"])
            const docUrl = getValues("document_url")
            const docFile = getValues("document_file")
            if (!docUrl && !docFile) {
                toast.error("Vui lòng tải lên tài liệu chứng minh pháp lý.")
                isStepValid = false
            }
        }
        return isStepValid
    }

    const nextStep = async () => {
        const isValid = await validateStep()
        if (isValid) {
            setCurrentStep(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
            toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc.")
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => prev - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return {
        currentStep,
        setCurrentStep,
        channelManager,
        setChannelManager,
        nextStep,
        prevStep,
        validateStep,
        STEPS
    }
}
