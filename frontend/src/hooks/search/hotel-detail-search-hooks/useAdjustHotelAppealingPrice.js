export default function useAdjustHotelAppealingPrice(hotel, nights) {
    const originalPricePerNight = hotel.appealing_price ? Math.round(hotel.appealing_price * 1.25) : 0
    const currentPricePerNight = hotel.appealing_price || 0

    const totalOriginalPrice = originalPricePerNight * nights
    const totalCurrentPrice = currentPricePerNight * nights

    return {
        totalOriginalPrice,
        totalCurrentPrice
    }

}