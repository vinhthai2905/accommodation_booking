import BasicInfoStep from "../components/onboarding-steps/BasicInfoStep"
import PropertySetupStep from "../components/onboarding-steps/PropertySetupStep"
import LegalInfoStep from "../components/onboarding-steps/LegalInfoStep"
import OnboardingHeader from "../section/OnboardingHeader"
import OnboardingStepper from "../section/OnboardingStepper"
import PendingApproval from "../components/onboarding-status/PendingApproval"
import RejectionAlert from "../components/onboarding-status/RejectionAlert"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { ArrowLeft, ArrowRight, Loader2, Clock, Info, RefreshCw } from "lucide-react"
import toast from "react-hot-toast"

import {
    fetchHotelTypes,
    fetchWards,
    submitHotelRegistration,
    fetchHotelRegistrationStatus
} from "../services/partnerOnboardingServices"
import { useAuthUserContext } from "../../../hooks/authentication/common/useAuthUserContext"

import { useFormPartnerHotelRegistration } from "../../../hooks/partner-onboarding/useFormPartnerHotelRegistration"

export default function PartnerOnboarding() {
    const navigate = useNavigate()
    const { user, clearAuthUserState } = useAuthUserContext()

    // Onboarding Form States
    const [currentStep, setCurrentStep] = useState(1)
    const [hotelTypes, setHotelTypes] = useState([])
    const [wards, setWards] = useState([])
    const [loadingData, setLoadingData] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [completed, setCompleted] = useState(false)


    const { formData, setFormData } = useFormPartnerHotelRegistration()

    // Form fields

    // Mock UI helper states
    const [channelManager, setChannelManager] = useState("no")
    const [registration, setRegistration] = useState(null)
    const [loadingStatus, setLoadingStatus] = useState(true)

    const checkRegistrationStatus = async (isManualRefresh = false) => {
        if (isManualRefresh) {
            setLoadingStatus(true)
        }
        try {
            const regStatus = await fetchHotelRegistrationStatus()
            setRegistration(regStatus)

            if (regStatus && regStatus.status === "Đã duyệt") {
                toast.success("Đơn đăng ký của bạn đã được duyệt!")
                setTimeout(() => {
                    window.location.href = "/partner/dashboard"
                }, 1000)
                return
            }

            if (isManualRefresh) {
                if (regStatus && regStatus.status === "Chờ duyệt") {
                    toast.success("Hồ sơ vẫn đang trong quá trình chờ phê duyệt.")
                } else if (!regStatus || !regStatus.status) {
                    toast.error("Không tìm thấy đơn đăng ký.")
                }
            }

            if (regStatus && regStatus.status === "Chờ duyệt") {
                setLoadingData(false)
                setLoadingStatus(false)
                return
            }

            // Load dropdown lists if filling form
            const [typesData, wardsData] = await Promise.all([
                fetchHotelTypes(),
                fetchWards()
            ])
            setHotelTypes(typesData || [])
            setWards(wardsData || [])

            if (regStatus && regStatus.status === "Từ chối") {
                setFormData({
                    hotel_name: regStatus.hotel_name || "",
                    id_hotel_type: regStatus.id_hotel_type?.toString() || "",
                    phone_number: regStatus.phone_number || "",
                    id_ward: regStatus.id_ward?.toString() || "",
                    address: regStatus.address || "",
                    document_name: regStatus.document_name || "Giấy phép kinh doanh",
                    document_url: regStatus.document_url || "",
                    document_file: null
                })
            }
        } catch (err) {
            console.error(err)
            toast.error("Không thể tải thông tin đăng ký.")
        } finally {
            setLoadingStatus(false)
            setLoadingData(false)
        }
    }

    useEffect(() => {
        checkRegistrationStatus()
    }, [])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleFileUploadSimulate = () => {
        // Simulate a file upload
        const simulatedUrl = `/media/documents/${Date.now()}_document.pdf`
        setFormData(prev => ({
            ...prev,
            document_url: simulatedUrl,
            document_file: null
        }))
        toast.success("Tải lên tài liệu mẫu thành công!")
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData(prev => ({
                ...prev,
                document_file: file,
                document_url: ""
            }))
            toast.success(`Đã chọn tệp: ${file.name}`)
        }
    }

    const validateStep = () => {
        if (currentStep === 1) {
            if (!formData.hotel_name.trim()) {
                toast.error("Vui lòng nhập tên chỗ nghỉ.")
                return false
            }
            if (!formData.id_hotel_type) {
                toast.error("Vui lòng chọn loại chỗ nghỉ.")
                return false
            }
            if (!formData.phone_number.trim()) {
                toast.error("Vui lòng nhập số điện thoại.")
                return false
            }
        } else if (currentStep === 2) {
            if (!formData.id_ward) {
                toast.error("Vui lòng chọn phường/xã.")
                return false
            }
            if (!formData.address.trim()) {
                toast.error("Vui lòng nhập địa chỉ cụ thể.")
                return false
            }
        } else if (currentStep === 3) {
            if (!formData.document_name) {
                toast.error("Vui lòng chọn tên tài liệu pháp lý.")
                return false
            }
            if (!formData.document_url && !formData.document_file) {
                toast.error("Vui lòng tải lên tài liệu chứng minh pháp lý.")
                return false
            }
        }
        return true
    }

    const nextStep = () => {
        if (validateStep()) {
            setCurrentStep(prev => prev + 1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    const prevStep = () => {
        setCurrentStep(prev => prev - 1)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            // Prepare payload (using FormData if a file is uploaded, otherwise JSON)
            let payload
            if (formData.document_file) {
                payload = new FormData()
                payload.append("hotel_name", formData.hotel_name)
                payload.append("id_hotel_type", parseInt(formData.id_hotel_type))
                payload.append("phone_number", formData.phone_number)
                payload.append("id_ward", parseInt(formData.id_ward))
                payload.append("address", formData.address)
                payload.append("document_name", formData.document_name)
                payload.append("document_file", formData.document_file)
                if (formData.document_url) {
                    payload.append("document_url", formData.document_url)
                }
            } else {
                payload = {
                    hotel_name: formData.hotel_name,
                    id_hotel_type: parseInt(formData.id_hotel_type),
                    phone_number: formData.phone_number,
                    id_ward: parseInt(formData.id_ward),
                    address: formData.address,
                    document_name: formData.document_name,
                    document_url: formData.document_url
                }
            }

            await submitHotelRegistration(payload)
            toast.success("Gửi đơn đăng ký chỗ nghỉ thành công!")
            await checkRegistrationStatus()
        } catch (err) {
            console.error(err)
            let errorMsg = "Gửi đơn đăng ký thất bại."
            try {
                const parsed = JSON.parse(err.message)
                const firstError = Object.values(parsed)[0]
                if (firstError) errorMsg = Array.isArray(firstError) ? firstError[0] : firstError
            } catch (_) { }
            toast.error(errorMsg)
        } finally {
            setSubmitting(false)
        }
    }

    // Step names
    const STEPS = [
        { id: 1, label: "Thông tin cơ bản" },
        { id: 2, label: "Cài đặt chỗ nghỉ" },
        { id: 3, label: "Thông tin pháp lý" }
    ]

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

                            {/* STEP 1: Basic Info */}
                            {currentStep === 1 && (
                                <BasicInfoStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    hotelTypes={hotelTypes}
                                />
                            )}

                            {/* STEP 2: Address and Property settings */}
                            {currentStep === 2 && (
                                <PropertySetupStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    wards={wards}
                                    channelManager={channelManager}
                                    setChannelManager={setChannelManager}
                                />
                            )}

                            {/* STEP 3: Legal Info, Document Upload & Summary */}
                            {currentStep === 3 && (
                                <LegalInfoStep
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleFileUploadSimulate={handleFileUploadSimulate}
                                    handleFileChange={handleFileChange}
                                    hotelTypes={hotelTypes}
                                    wards={wards}
                                />
                            )}

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
                                        onClick={handleSubmit}
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
