import PropertySetupStep from "../onboarding-steps/PropertySetupStep"
import OnboardingStepper from "../../section/OnboardingStepper"
import RejectionAlert from "../onboarding-status/RejectionAlert"
import BasicInfoStep from "../onboarding-steps/BasicInfoStep"
import LegalInfoStep from "../onboarding-steps/LegalInfoStep"
import OnboardingNavigation from "../onboarding/OnboardingNavigation"

import { FormProvider } from "react-hook-form"

export default function OnboardingForm({ 
    methods,
    currentStep, 
    setCurrentStep, 
    validateStep,
    STEPS,
    wards, 
    prevStep, 
    nextStep, 
    registration,
    hotelTypes, 
    handleFileUploadSimulate,
    handleFileChange,
    submittingHotelRegistration,
    handleSubmitHotelRegistration
}) {
    return (
        currentStep === 2 ? (
            <div className="w-full h-full min-h-[calc(100vh-140px)] relative">
                <FormProvider {...methods}>
                    <PropertySetupStep
                        wards={wards}
                        prevStep={prevStep}
                        nextStep={nextStep}
                    />
                </FormProvider>
            </div>
        ) : (
            <div className="flex flex-col gap-6">
                <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                    <OnboardingStepper
                        steps={STEPS}
                        currentStep={currentStep}
                        setCurrentStep={setCurrentStep}
                        validateStep={validateStep}
                    />

                    <div className="p-6 md:p-8">

                        <RejectionAlert registration={registration} />

                        <FormProvider {...methods}>
                            {currentStep === 1 && (
                                <BasicInfoStep
                                    hotelTypes={hotelTypes}
                                />
                            )}

                            {currentStep === 3 && (
                                <LegalInfoStep
                                    handleFileUploadSimulate={handleFileUploadSimulate}
                                    handleFileChange={handleFileChange}
                                    hotelTypes={hotelTypes}
                                    wards={wards}
                                />
                            )}
                        </FormProvider>

                        <OnboardingNavigation
                            currentStep={currentStep}
                            prevStep={prevStep}
                            nextStep={nextStep}
                            methods={methods}
                            submittingHotelRegistration={submittingHotelRegistration}
                            handleSubmitHotelRegistration={handleSubmitHotelRegistration}
                        />
                    </div>
                </div>
            </div>
        )
    )
}