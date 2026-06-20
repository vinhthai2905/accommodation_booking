import BasicInfoStep from "../components/onboarding-steps/BasicInfoStep"
import PropertySetupStep from "../components/onboarding-steps/PropertySetupStep"
import LegalInfoStep from "../components/onboarding-steps/LegalInfoStep"
import OnboardingHeader from "../section/OnboardingHeader"
import OnboardingStepper from "../section/OnboardingStepper"
import PendingApproval from "../components/onboarding-status/PendingApproval"
import RejectionAlert from "../components/onboarding-status/RejectionAlert"

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { FormProvider } from "react-hook-form"

import { useAuthUserContext } from "../../../hooks/authentication/common/useAuthUserContext"
import { usePartnerOnboardingForm } from "../../../hooks/partner-onboarding/form/usePartnerOnboardingForm"
import { usePartnerOnboardingStatus } from "../../../hooks/partner-onboarding/common/usePartnerOnboardingStatus"
import { usePartnerOnboardingOptions } from "../../../hooks/partner-onboarding/common/usePartnerOnboardingOptions"
import { usePartnerOnboardingSteps } from "../../../hooks/partner-onboarding/common/usePartnerOnboardingSteps"
import { usePartnerOnboardingSubmit } from "../../../hooks/partner-onboarding/form/usePartnerOnboardingSubmit"
import OnboardingSubmitButton from "../components/onboarding/OnboardingSubmitButton"
import OnboardingNavigation from "../components/onboarding/OnboardingNavigation"
import OnboardingForm from "../components/onboarding-form/OnboardingForm"

export default function PartnerOnboarding() {
    const { user, clearAuthUserState } = useAuthUserContext()

    const {
        methods,
        handleFileUploadSimulate,
        handleFileChange
    } = usePartnerOnboardingForm()

    const {
        hotelTypes,
        wards,
        loadingOptions
    } = usePartnerOnboardingOptions()

    const {
        registration,
        loadingStatus,
        checkRegistrationStatus
    } = usePartnerOnboardingStatus(methods)

    const loadingData = loadingOptions || loadingStatus

    const {
        currentStep,
        setCurrentStep,
        nextStep,
        prevStep,
        validateStep,
        STEPS
    } = usePartnerOnboardingSteps(methods)

    const { 
        navigate,
        submittingHotelRegistration, 
        handleSubmitHotelRegistration 
    } = usePartnerOnboardingSubmit(checkRegistrationStatus)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <OnboardingHeader
                user={user}
                navigate={navigate}
                clearAuthUserState={clearAuthUserState}
            />

            <main className={currentStep === 2 && registration?.status !== "Chờ duyệt" && !loadingData ? "flex-1 w-full relative" : "flex-1 max-w-3xl w-full mx-auto p-4 md:p-8"}>
                {loadingData 
                    ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <Loader2 className="animate-spin text-blue-600" size={40} />
                            <p className="text-gray-500 font-medium">Đang tải cấu hình biểu mẫu...</p>
                        </div>
                )   : (registration && registration.status === "Chờ duyệt") 
                        ? (
                        <div className="px-4">
                            <PendingApproval
                                registration={registration}
                                loadingStatus={loadingStatus}
                                checkRegistrationStatus={checkRegistrationStatus}
                                clearAuthUserState={clearAuthUserState}
                            />
                        </div>
                    )       
                        : (
                            <OnboardingForm 
                                methods={methods}
                                currentStep={currentStep}
                                setCurrentStep={setCurrentStep}
                                validateStep={validateStep}
                                STEPS={STEPS}
                                wards={wards}
                                prevStep={prevStep}
                                nextStep={nextStep}
                                registration={registration}
                                hotelTypes={hotelTypes}
                                handleFileUploadSimulate={handleFileUploadSimulate}
                                handleFileChange={handleFileChange}
                                submittingHotelRegistration={submittingHotelRegistration}
                                handleSubmitHotelRegistration={handleSubmitHotelRegistration}
                            />
                    )
                }
            </main>
        </div>
    )
}
