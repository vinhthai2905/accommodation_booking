import OnboardingSubmitButton from "./OnboardingSubmitButton"

export default function OnboardingNavigation({
    currentStep, 
    prevStep, 
    nextStep, 
    methods, 
    submittingHotelRegistration, 
    handleSubmitHotelRegistration
}) {
    return (
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
            {currentStep > 1 ? (
                <button
                    onClick={prevStep}
                    className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-2 text-sm"
                    disabled={submittingHotelRegistration}
                >
                    <ArrowLeft size={16} /> Quay lại
                </button>
            ) : (
                <div />
            )}

            {currentStep < 3 ? (
                <button
                    onClick={nextStep}
                    className="px-6 py-2.5 bg-[#006ce4] hover:bg-[#0053b4] text-white font-bold rounded-lg shadow transition-colors flex items-center gap-2 text-sm"
                >
                    Tiếp tục <ArrowRight size={16} />
                </button>
            ) : (
                <OnboardingSubmitButton
                    methods={methods}
                    submittingHotelRegistration={submittingHotelRegistration}
                    handleSubmitHotelRegistration={handleSubmitHotelRegistration}
                />
            )}
        </div>
    )
}