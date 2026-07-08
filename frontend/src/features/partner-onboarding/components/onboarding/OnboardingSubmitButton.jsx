import { Loader2 } from "lucide-react"

export default function OnboardingSubmitButton({ methods, submittingHotelRegistration, handleSubmitHotelRegistration }) {
    const { formState: { errors }, watch } = methods
    
    const documentNameError = !!errors.document_name
    const docFile = watch("document_file")
    const docUrl = watch("document_url")
    
    const hasMissingDoc = !docFile && !docUrl
    const isSubmitDisabled = submittingHotelRegistration || documentNameError || hasMissingDoc

    return (
        <button
            onClick={methods.handleSubmit(handleSubmitHotelRegistration)}
            disabled={isSubmitDisabled}
            className={`px-8 py-2.5 font-bold rounded-lg shadow-md transition-colors flex items-center gap-2 text-sm ${
                isSubmitDisabled 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-green-600 hover:bg-green-700 text-white"
            }`}
        >
            {submittingHotelRegistration ? (
                <>
                    <Loader2 className="animate-spin" size={16} /> Đang gửi...
                </>
            ) : (
                <>
                    Hoàn tất và gửi đăng ký
                </>
            )}
        </button>
    )
}