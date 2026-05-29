export default function OnboardingSubmitButton({ methods, submittingHotelRegistration, handleSubmitHotelRegistration }) {
    return (
        <button
            onClick={methods.handleSubmit(handleSubmitHotelRegistration)}
            disabled={submittingHotelRegistration}
            className="px-8 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold rounded-lg shadow-md transition-colors flex items-center gap-2 text-sm"
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