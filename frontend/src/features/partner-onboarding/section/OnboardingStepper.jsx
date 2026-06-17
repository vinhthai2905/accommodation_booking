import { clsx } from "clsx"
import { Check } from "lucide-react"

export default function OnboardingStepper({ steps, currentStep, setCurrentStep, validateStep }) {
    return (
        <div className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-3xl mx-auto px-6">
                <div className="flex justify-around text-xs md:text-sm font-medium">
                    {steps.map((s) => {
                        const isActive = currentStep === s.id
                        const isCompleted = currentStep > s.id
                        return (
                            <div 
                                key={s.id}
                                className={clsx(
                                    "relative py-4 px-2 flex items-center gap-2 cursor-pointer transition-all border-b-2 -mb-px text-gray-500 hover:text-gray-700",
                                    isActive 
                                        ? "border-[#006ce4] text-[#006ce4] font-bold" 
                                        : "border-transparent"
                                )}
                                onClick={() => {
                                    if (s.id < currentStep) {
                                        setCurrentStep(s.id)
                                    } else if (s.id > currentStep) {
                                        if (validateStep()) {
                                            setCurrentStep(s.id)
                                        }
                                    }
                                }}
                            >
                                <span>{s.label}</span>
                                {isCompleted ? (
                                    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-600 text-white">
                                        <Check size={10} strokeWidth={3} />
                                    </span>
                                ) : (
                                    !isActive && (
                                        <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-50 border border-amber-600 text-amber-600 text-[10px] font-bold">
                                            !
                                        </span>
                                    )
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
