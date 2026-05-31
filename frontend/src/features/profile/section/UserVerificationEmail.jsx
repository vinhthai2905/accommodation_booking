import { useState, useEffect } from "react"
import { Mail, CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck } from "lucide-react"

export default function UserVerificationEmail() {
    const [verificationStatus, setVerificationStatus] = useState("loading")

    // Remove this in production. Just to demo the UI states automatically.
    useEffect(() => {
        const timer = setTimeout(() => {
            setVerificationStatus("success")
        }, 2500)
        return () => clearTimeout(timer)
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-40 animate-blob animation-delay-4000"></div>

            <div className="relative w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 sm:p-12 overflow-hidden transform transition-all hover:scale-[1.01] duration-500">
                <div 
                    className={`absolute top-0 left-0 w-full h-1.5 transition-colors duration-500 ${
                        verificationStatus === "loading" ? "bg-blue-500 animate-pulse" :
                        verificationStatus === "success" ? "bg-emerald-500" : "bg-rose-500"
                    }`}
                ></div>

                <div className="flex flex-col items-center text-center space-y-6">
                    
                    <div className="relative">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 ease-out ${
                            verificationStatus === "loading" ? "bg-blue-100 shadow-[0_0_40px_rgba(59,130,246,0.3)]" :
                            verificationStatus === "success" ? "bg-emerald-100 shadow-[0_0_40px_rgba(16,185,129,0.3)] scale-110" : 
                            "bg-rose-100 shadow-[0_0_40px_rgba(244,63,94,0.3)] scale-110"
                        }`}>
                            {verificationStatus === "loading" && (
                                <Mail className="w-10 h-10 text-blue-600 animate-bounce" />
                            )}
                            {verificationStatus === "success" && (
                                <ShieldCheck className="w-12 h-12 text-emerald-600 animate-[spin_0.5s_ease-out]" />
                            )}
                            {verificationStatus === "error" && (
                                <XCircle className="w-12 h-12 text-rose-600 animate-[shake_0.5s_ease-in-out]" />
                            )}
                        </div>
                        
                        {verificationStatus === "loading" && (
                            <svg className="absolute top-0 left-0 w-24 h-24 text-blue-500 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </div>

                    <div className="space-y-3 transition-all duration-500">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            {verificationStatus === "loading" && "Đang xác thực..."}
                            {verificationStatus === "success" && "Xác thực thành công!"}
                            {verificationStatus === "error" && "Xác thực thất bại"}
                        </h2>
                        
                        <p className="text-slate-500 text-sm sm:text-base leading-relaxed px-4">
                            {verificationStatus === "loading" && "Vui lòng đợi trong giây lát, chúng tôi đang kiểm tra thông tin của bạn. Quá trình này sẽ diễn ra rất nhanh."}
                            {verificationStatus === "success" && "Tuyệt vời! Địa chỉ email của bạn đã được xác nhận. Bạn đã có thể sử dụng đầy đủ các tính năng của chúng tôi."}
                            {verificationStatus === "error" && "Rất tiếc, liên kết xác thực này không hợp lệ hoặc đã hết hạn. Vui lòng yêu cầu một liên kết mới từ trang cá nhân."}
                        </p>
                    </div>

                    <div className="w-full pt-6">
                        {verificationStatus === "loading" && (
                            <div className="flex justify-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            </div>
                        )}

                        {verificationStatus === "success" && (
                            <button className="w-full group relative flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)] hover:shadow-[0_10px_25px_-10px_rgba(0,0,0,0.6)] cursor-pointer">
                                <span>Tiếp tục khám phá</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        )}

                        {verificationStatus === "error" && (
                            <div className="space-y-3 w-full">
                                <button className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-rose-200 cursor-pointer">
                                    Gửi lại email xác thực
                                </button>
                                <button className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3.5 px-6 rounded-xl transition-all border border-slate-200 cursor-pointer">
                                    Trở về trang chủ
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- Dev Only: Toggle States --- */}
                <div className="absolute bottom-2 right-2 flex space-x-1 opacity-20 hover:opacity-100 transition-opacity">
                    <button onClick={() => setVerificationStatus("loading")} className="text-[10px] bg-slate-100 px-2 py-1 rounded cursor-pointer">Load</button>
                    <button onClick={() => setVerificationStatus("success")} className="text-[10px] bg-slate-100 px-2 py-1 rounded cursor-pointer">OK</button>
                    <button onClick={() => setVerificationStatus("error")} className="text-[10px] bg-slate-100 px-2 py-1 rounded cursor-pointer">Err</button>
                </div>
            </div>
        </div>
    );
}
