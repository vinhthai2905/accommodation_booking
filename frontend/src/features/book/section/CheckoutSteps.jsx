import StepProcess from "../components/StepProcess"

const steps = [
    { id: 1, label: "Bạn chọn" },
    { id: 2, label: "Chi tiết về bạn" },
    { id: 3, label: "Hoàn tất đặt phòng" },
]

export default function CheckoutSteps({ currentStep }) {
    return (
        <div className="flex items-center">
            {steps.map((step, index) => (
                <StepProcess
                    key={step.id}
                    stepNumber={step.id}
                    label={step.label}
                    isCompleted={step.id < currentStep}
                    isCurrent={step.id === currentStep}
                    isLastStep={index === steps.length - 1}
                />
            ))}
        </div>
    )
}