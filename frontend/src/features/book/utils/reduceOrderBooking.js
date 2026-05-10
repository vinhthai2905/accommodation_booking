export const reduceOrderBooking = (orderId) => {
    if (!orderId || typeof orderId !== "string") return ""

    return `#${orderId.replace(/-/g, "").slice(0, 8).toUpperCase()}`
}