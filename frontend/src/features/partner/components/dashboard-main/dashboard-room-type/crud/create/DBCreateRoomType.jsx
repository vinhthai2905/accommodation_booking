import DBCreateRoomTypeForm from "../components/DBCreateRoomTypeForm"
import DBRoomTypeCreateHeader from "./DBRoomTypeCreateHeader"

import { clsx } from "clsx"
import { motion } from "framer-motion"
import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { Layout  } from "lucide-react"

import usePartnerCreateRoomTypeForm from "../../../../../../../hooks/dashboard/partner/room-type-hooks/form/usePartnerCreateRoomTypeForm"
import useSucessRedirect from "../../../../../../../hooks/dashboard/partner/room-type-hooks/form/useSuccessRedirect"

export default function DBCreateRoomType() {
    const navigate = useNavigate()

    const {
        formHookMethods,
        createRoomTypeMutation,
        onSuccessValidatedForm,
        onErrorValidatedForm,
    } = usePartnerCreateRoomTypeForm()

    useSucessRedirect(createRoomTypeMutation, navigate, "/partner/dashboard/hotel/room-type")

    return (
        <div className="flex flex-col flex-1 w-full space-y-6">
            <DBRoomTypeCreateHeader motion={motion} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                    "flex flex-1 min-h-0 w-full flex-col",
                    "rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden"
                )}
            >
                <div className="px-6 py-5 border-b border-gray-100 bg-linear-to-r from-gray-50/50 to-white flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <Layout size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 leading-none">Thông tin chi tiết</h2>
                        <p className="text-sm text-gray-500 mt-1">Vui lòng cung cấp các thông số kỹ thuật cho loại phòng này.</p>
                    </div>
                </div>

                <div className="p-2">
                    <FormProvider {...formHookMethods}>
                        <DBCreateRoomTypeForm
                            onSuccessValidatedForm={onSuccessValidatedForm}
                            onErrorValidatedForm={onErrorValidatedForm}
                            isPending={createRoomTypeMutation.isPending}
                            onCancel={() => navigate(-1)}
                        />
                    </FormProvider>
                </div>
            </motion.div>
        </div>
    )
}
