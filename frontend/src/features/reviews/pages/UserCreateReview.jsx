import HotelRatingSection from "../components/HotelRatingSection"
import HotelCommentsSection from "../components/HotelCommentsSection"
import HotelReviewActionButtons from "../components/HotelReviewActionButtons"
import UserCreateReviewStates from "./UserCreateReviewStates"

import { FormProvider } from "react-hook-form"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useReviewForm } from "../../../hooks/reviews/useReviewForm"
import { useReviewMutation } from "../../../hooks/reviews/useReviewMutation"
import { useReviewNavigation } from "../../../hooks/reviews/useReviewNavigation"

export default function UserCreateReview() {
    const {
        navigate,
        location,
        bookingID,
        hotelName
    } = useReviewNavigation()

    const { createReviewMutation } = useReviewMutation()

    const {
        methods,
        onSuccessValidatedReview
    } = useReviewForm(createReviewMutation, navigate, bookingID)

    const hasState =
        createReviewMutation.isPending ||
        createReviewMutation.isSuccess ||
        createReviewMutation.isError

    if (hasState)
        return (
            <UserCreateReviewStates
                createReviewMutation={createReviewMutation}
                navigate={navigate}
            />
        )

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors mb-6"
                >
                    <ArrowLeft size={16} /> Quay lại
                </button>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                >
                    <div className="px-6 py-5 border-b border-gray-100 bg-blue-50/50">
                        <h1 className="text-xl font-bold text-gray-900">Đánh giá kỳ nghỉ của bạn</h1>
                        <p className="text-sm text-gray-500 mt-1">Tại {hotelName}</p>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSuccessValidatedReview)} className="p-6">
                            <HotelRatingSection />

                            <HotelCommentsSection />

                            <HotelReviewActionButtons
                                navigate={navigate}
                                isSubmitting={createReviewMutation.isPending}
                            />
                        </form>
                    </FormProvider>
                </motion.div>
            </div>
        </div>
    )
}

