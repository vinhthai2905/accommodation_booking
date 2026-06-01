export default function VerificationFailedButton({ navigate }) {
    return (
        <div className="space-y-3 w-full">
            <button
                onClick={() => navigate("/")}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3.5 px-6 rounded-xl transition-all border border-slate-200 cursor-pointer"
            >
                Trở về trang chủ
            </button>
        </div>
    )
}