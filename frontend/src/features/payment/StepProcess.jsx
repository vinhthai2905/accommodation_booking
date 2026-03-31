import clsx from "clsx"

export default function StepProcess({
    stepNumber,
    label,
    isCompleted,
    isCurrent,
    isLastStep,
}) {
    const isActive = isCompleted || isCurrent

    return (
            <div className={clsx(
                "flex items-center",
                isLastStep === false ? "flex-1" : "flex-0"
            )}>
                <div className="flex items-center gap-2">
                    <div
                        className={clsx(
                            "flex items-center justify-center",
                            "h-7 w-7 rounded-full border",
                            "text-sm font-semibold",
                            {
                                "border-blue-600 bg-blue-600 text-white": isActive,
                                "border-gray-400 bg-white text-gray-500": !isActive,
                            }
                        )}
                    >
                        {isCompleted ? "✓" : stepNumber}
                    </div>

                    <span
                        className={clsx("whitespace-nowrap text-sm font-semibold", {
                            "text-black": isActive,
                            "text-gray-500": !isActive,
                        })}
                    >
                        {label}
                    </span>
                </div>

                {!isLastStep && <div className="mx-3 h-px flex-1 bg-gray-300" />}
            </div>

    )
}