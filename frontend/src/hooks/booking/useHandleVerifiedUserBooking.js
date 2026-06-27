import { toast } from "react-hot-toast"
import { useAuthUserContext } from "../authentication/common/useAuthUserContext"

export default function useHandleVerifiedUserBooking() {
    const { user, isVerified } = useAuthUserContext()

    const checkVerifiedUser = () => {
        if (!user) {
            toast.error("Vui lòng đăng nhập để đặt phòng.")
            return false
        }
        
        if (!isVerified) {
            toast.error("Tài khoản của bạn chưa được xác thực. Vui lòng xác thực email để tiếp tục đặt phòng.")
            return false
        }
        
        return true
    }

    return { checkVerifiedUser }
}
