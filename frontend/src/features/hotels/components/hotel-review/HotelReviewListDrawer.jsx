import HotelReviewListItem from "./HotelReviewListItem"

import { useEffect } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import useHotelDetailsContext from "../../../../hooks/hotel/useHotelDetailsContext"

import { useReviewHotelList } from "../../../../hooks/reviews/useReviewHotelList"

export default function HotelReviewListDrawer({ isReviewDrawerOpen, onClose }) {
  const { hotelQuery } = useHotelDetailsContext()
  const id_hotel = hotelQuery.data?.id_hotel

  const { data: reviewsData, isLoading, isError } = useReviewHotelList(id_hotel)

  const reviews = Array.isArray(reviewsData) ? reviewsData : reviewsData?.results || []

  useEffect(() => {
    if (isReviewDrawerOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isReviewDrawerOpen])

  return (
    <AnimatePresence>
      {isReviewDrawerOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-9999 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-9999 w-full md:w-[80%] lg:w-[60%] xl:w-[50%] bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Đánh giá của khách</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 transition-colors hover:text-gray-900 rounded-md hover:bg-gray-100"
                aria-label="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Đánh giá của khách</h3>
                </div>

                
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
