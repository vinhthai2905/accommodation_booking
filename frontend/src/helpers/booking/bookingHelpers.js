import { parse, differenceInDays } from "date-fns"

export function formatDate(dateStr) {
    if (!dateStr) return "—"
    return new Date(dateStr).toLocaleDateString("vi-VN", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

export function formatCurrency(amount) {
    if (amount == null) return "—"
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
    }).format(amount)
}

export function nightsBetween(checkIn, checkOut) {
    if (!checkIn || !checkOut) return 0
    const diff = new Date(checkOut) - new Date(checkIn)
    return Math.max(0, Math.round(diff / (1000 * 60 * 60 * 24)))
}

export function getNightsFromSearchParams() {
    if (typeof window === "undefined") return 1
    const params = new URLSearchParams(window.location.search)
    const checkInStr = params.get("check_in")
    const checkOutStr = params.get("check_out")
    if (checkInStr && checkOutStr) {
        try {
            const checkInDate = parse(checkInStr, "dd-MM-yyyy", new Date())
            const checkOutDate = parse(checkOutStr, "dd-MM-yyyy", new Date())
            return Math.max(1, differenceInDays(checkOutDate, checkInDate))
        } catch (e) {
            console.error("Error parsing stay dates:", e)
        }
    }
    return 1
}

