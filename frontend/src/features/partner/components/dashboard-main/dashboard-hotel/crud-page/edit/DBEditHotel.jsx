import DBEditHotelForm from "../components/DBEditHotelForm"
import DBHotelEditHeader from "./DBHotelEditHeader"
import LoadingHotelDatas from "../../../../../ui/dashboard-main/common/LoadingHotelDatas"
import ErrorLoadingHotelDatas from "../../../../../ui/dashboard-main/common/ErrorLoadingHotelDatas"

import { clsx } from "clsx"
import { motion, AnimatePresence } from "framer-motion"
import { FormProvider } from "react-hook-form"
import { Edit3, MapPin, Building, Globe, Copy, Check, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

import useSuccessRedirect from "../../../../../../../hooks/dashboard/partner/room-type-hooks/form/useSuccessRedirect"
import usePartnerHotel from "../../../../../../../hooks/dashboard/partner/hotel-hooks/services/usePartnerHotel"
import usePartnerEditHotelForm from "../../../../../../../hooks/dashboard/partner/hotel-hooks/form/usePartnerEditHotelForm"

export default function DBEditHotel() {
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)
    const [copied, setCopied] = useState(false)

    const {
        data: hotel,
        isPending: isPendingHotel,
        isError,
        error
    } = usePartnerHotel()

    const {
        formHookMethods,
        updateHotelMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    } = usePartnerEditHotelForm(hotel)

    useSuccessRedirect(updateHotelMutation, navigate, "/partner/dashboard/hotel/info")

    // Tự động tắt chế độ chỉnh sửa khi cập nhật thành công
    useEffect(() => {
        if (updateHotelMutation.isSuccess) {
            setIsEditing(false)
        }
    }, [updateHotelMutation.isSuccess])

    if (isPendingHotel)
        return <LoadingHotelDatas labelLoading="Đang tải dữ liệu khách sạn..." />

    if (isError)
        return (
            <ErrorLoadingHotelDatas
                errorMessage={error.message}
                alterMessageError="Không thể tải dữ liệu khách sạn. Vui lòng thử lại sau."
                error={error}
            />
        )

    const handleCopy = () => {
        if (!hotel?.id_hotel) return
        navigator.clipboard.writeText(hotel.id_hotel)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const primaryImage = hotel?.hotel_images?.find(img => img.is_primary) || hotel?.hotel_images?.[0]

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBHotelEditHeader motion={motion} hotelName={hotel?.name} isEditing={isEditing} />

            <AnimatePresence mode="wait">
                {!isEditing ? (
                    <motion.div
                        key="view"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                            "flex flex-1 min-h-0 w-full flex-col",
                            "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                        )}
                    >
                        {/* Banner Image or Placeholder */}
                        <div className="relative h-48 sm:h-64 bg-linear-to-r from-blue-500 to-indigo-600 overflow-hidden">
                            {primaryImage ? (
                                <img 
                                    src={primaryImage.url} 
                                    alt={hotel.name} 
                                    className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                                    <Building size={120} className="stroke-[1]" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
                            
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="bg-blue-600/90 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md border border-white/10 shadow-lg">
                                    Kênh đối tác
                                </span>
                                <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 drop-shadow-md">{hotel?.name}</h2>
                                <p className="text-white/80 text-xs sm:text-sm flex items-center gap-1.5 mt-1 drop-shadow-sm">
                                    <MapPin size={14} className="text-blue-300" />
                                    {hotel?.address}
                                </p>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs rounded-xl shadow-lg border border-gray-100 transition-all active:scale-95 cursor-pointer group"
                            >
                                <Edit3 size={14} className="text-blue-600 group-hover:rotate-12 transition-transform" />
                                Chỉnh sửa thông tin
                            </button>
                        </div>

                        {/* Details Grid */}
                        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 bg-linear-to-b from-white to-gray-50/50">
                            {/* Card: Tên khách sạn */}
                            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                    <Building size={20} />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tên khách sạn</span>
                                    <p className="text-base font-semibold text-gray-900 leading-snug">{hotel?.name}</p>
                                </div>
                            </div>

                            {/* Card: Địa chỉ */}
                            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                    <MapPin size={20} />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Địa chỉ khách sạn</span>
                                    <p className="text-base font-semibold text-gray-900 leading-snug">{hotel?.address}</p>
                                </div>
                            </div>

                            {/* Card: Đường dẫn công khai */}
                            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                                    <Globe size={20} />
                                </div>
                                <div className="space-y-1 flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Trang hiển thị khách hàng</span>
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        /hotel/{hotel?.slug}/{hotel?.id_hotel}
                                    </p>
                                    <a
                                        href={`/hotel/${hotel?.slug}/${hotel?.id_hotel}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-bold mt-1.5 transition-colors group/link"
                                    >
                                        <Eye size={12} />
                                        Xem trang công khai
                                    </a>
                                </div>
                            </div>

                            {/* Card: UUID */}
                            <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-xs flex items-start gap-4">
                                <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                    <Copy size={20} />
                                </div>
                                <div className="space-y-1 flex-1 min-w-0">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Mã định danh khách sạn (UUID)</span>
                                    <p className="text-sm font-semibold text-gray-600 font-mono truncate">{hotel?.id_hotel}</p>
                                    <button
                                        onClick={handleCopy}
                                        className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-700 font-bold mt-1.5 transition-colors cursor-pointer"
                                    >
                                        {copied ? (
                                            <>
                                                <Check size={12} className="text-green-600" />
                                                <span className="text-green-600">Đã sao chép!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={12} />
                                                <span>Sao chép mã UUID</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="edit"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={clsx(
                            "flex flex-1 min-h-0 w-full flex-col",
                            "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                        )}
                    >
                        <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-gray-50/50 to-white flex items-center gap-3">
                            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                <Edit3 size={20} />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 leading-none">Chỉnh sửa thông tin</h2>
                                <p className="text-sm text-gray-500 mt-1">Cập nhật các thông tin cơ bản cho khách sạn của bạn.</p>
                            </div>
                        </div>

                        <div className="p-2">
                            <FormProvider {...formHookMethods}>
                                <DBEditHotelForm
                                    onSuccessValidatedForm={onSuccessValidatedForm}
                                    onErrorValidatedForm={onErrorValidatedForm}
                                    isPending={updateHotelMutation.isPending}
                                    onCancel={() => setIsEditing(false)}
                                />
                            </FormProvider>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
