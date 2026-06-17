export default function useCancellationMessage(refundPolicy, freeCancellationExpiresAt) {
    const getCancellationMessage = (booking) => {
        let confirmMessage = "Bạn có chắc chắn muốn hủy đặt phòng này?"

        const isFreeCancellationTime = freeCancellationExpiresAt && new Date() < new Date(freeCancellationExpiresAt)
        
        if (isFreeCancellationTime) {
            confirmMessage = "Bạn đang trong thời gian hủy miễn phí. Bạn có chắc chắn muốn hủy đặt phòng này?"
        } else if (refundPolicy) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            
            const checkInDate = new Date(booking.check_in_date)
            checkInDate.setHours(0, 0, 0, 0)
            
            const diffTime = checkInDate - today
            const daysBeforeCheckin = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
            
            if (daysBeforeCheckin <= refundPolicy.days_before_arrival_penalty) {
                const penaltyPercent = parseFloat(refundPolicy.penalty_percentage)
                const refundPercent = 100 - penaltyPercent
                confirmMessage = `Vì bạn hủy phòng trễ (ít hơn hoặc bằng ${refundPolicy.days_before_arrival_penalty} ngày trước khi nhận phòng), bạn sẽ bị trừ ${penaltyPercent}% phí phạt và chỉ được hoàn lại ${refundPercent}%. Bạn có chắc chắn muốn tiếp tục?`
            } else {
                confirmMessage = "Bạn sẽ được hoàn tiền 100% vì hủy phòng sớm. Bạn có chắc chắn muốn hủy đặt phòng này?"
            }
        }
        
        return confirmMessage
    }

    return { getCancellationMessage }
}
