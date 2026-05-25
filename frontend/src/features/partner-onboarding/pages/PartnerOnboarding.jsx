import BasicInfoStep from "../components/onboarding-steps/BasicInfoStep"
import PropertySetupStep from "../components/onboarding-steps/PropertySetupStep"
import LegalInfoStep from "../components/onboarding-steps/LegalInfoStep"
import OnboardingHeader from "../section/OnboardingHeader"
import OnboardingStepper from "../section/OnboardingStepper"
import PendingApproval from "../components/onboarding-status/PendingApproval"
import RejectionAlert from "../components/onboarding-status/RejectionAlert"

import { useNavigate } from "react-router"
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react"
import { FormProvider } from "react-hook-form"

import { useAuthUserContext } from "../../../hooks/authentication/common/useAuthUserContext"
import { useFormPartnerHotelRegistration } from "../../../hooks/partner-onboarding/useFormPartnerHotelRegistration"
import { useOnboardingStatus } from "../../../hooks/partner-onboarding/useOnboardingStatus"
import { useOnboardingSteps } from "../../../hooks/partner-onboarding/useOnboardingSteps"
import { useOnboardingSubmit } from "../../../hooks/partner-onboarding/useOnboardingSubmit"

export default function PartnerOnboarding() {
    const navigate = useNavigate()
    const { user, clearAuthUserState } = useAuthUserContext()

    const {
        methods,
        handleFileUploadSimulate,
        handleFileChange
    } = useFormPartnerHotelRegistration()

    const {
        hotelTypes,
        wards,
        loadingData,
        registration,
        loadingStatus,
        checkRegistrationStatus
    } = useOnboardingStatus(methods)

    const {
        currentStep,
        setCurrentStep,
        channelManager,
        setChannelManager,
        nextStep,
        prevStep,
        validateStep,
        STEPS
    } = useOnboardingSteps(methods)

    const { submitting, handleSubmitApi } = useOnboardingSubmit(checkRegistrationStatus)

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            <OnboardingHeader
                user={user}
                navigate={navigate}
                clearAuthUserState={clearAuthUserState}
            />

            {/* Stepper progress bar */}
            {(!registration || registration.status !== "Chờ duyệt") && (
                <OnboardingStepper
                    steps={STEPS}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    validateStep={validateStep}
                />
            )}

            {/* Main Form container */}
            <main className="flex-1 max-w-3xl w-full mx-auto p-4 md:p-8">
                {loadingData ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                        <p className="text-gray-500 font-medium">Đang tải cấu hình biểu mẫu...</p>
                    </div>
                ) : (registration && registration.status === "Chờ duyệt") ? (
                    /* Pending Approval screen */
                    <div className="px-4">
                        <PendingApproval
                            registration={registration}
                            loadingStatus={loadingStatus}
                            checkRegistrationStatus={checkRegistrationStatus}
                            clearAuthUserState={clearAuthUserState}
                        />
                    </div>
                ) : (
                    /* Wizard Forms */
                    <div className="flex flex-col gap-6">
                        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8">
                            
                            {/* Rejection Alert if applicable */}
                            <RejectionAlert registration={registration} />

                            <FormProvider {...methods}>
                                {/* STEP 1: Basic Info */}
                                {currentStep === 1 && (
                                    <BasicInfoStep
                                        hotelTypes={hotelTypes}
                                    />
                                )}

                                {/* STEP 2: Address and Property settings */}
                                {currentStep === 2 && (
                                    <PropertySetupStep
                                        wards={wards}
                                        channelManager={channelManager}
                                        setChannelManager={setChannelManager}
                                    />
                                )}

                                {/* STEP 3: Legal Info, Document Upload & Summary */}
                                {currentStep === 3 && (
                                    <LegalInfoStep
                                        handleFileUploadSimulate={handleFileUploadSimulate}
                                        handleFileChange={handleFileChange}
                                        hotelTypes={hotelTypes}
                                        wards={wards}
                                    />
                                )}
                            </FormProvider>

                            {/* Navigation buttons */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
                                {currentStep > 1 ? (
                                    <button
                                        onClick={prevStep}
                                        className="px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold rounded-lg transition-colors flex items-center gap-2 text-sm"
                                        disabled={submitting}
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
                                    <button
                                        onClick={methods.handleSubmit(handleSubmitApi)}
                                        disabled={submitting}
                                        className="px-8 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-lg shadow-md transition-colors flex items-center gap-2 text-sm"
                                    >
                                        {submitting ? (
                                            <>
                                                <Loader2 className="animate-spin" size={16} /> Đang gửi...
                                            </>
                                        ) : (
                                            <>
                                                Hoàn tất và gửi đăng ký
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
