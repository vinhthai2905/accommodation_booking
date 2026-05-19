import { parse, differenceInDays } from "date-fns"
import { useSearchParams } from "react-router"

export default function useAnalyzeGuestParams() {
    const [searchParams] = useSearchParams()

    const checkInStr = searchParams.get("check_in")
    const checkOutStr = searchParams.get("check_out")
    const adults = parseInt(searchParams.get("adults"))
    const children = parseInt(searchParams.get("children"))

    let nights = 1

    if (checkInStr && checkOutStr) {
        try {
            const checkInDate = parse(checkInStr, "dd-MM-yyyy", new Date())
            const checkOutDate = parse(checkOutStr, "dd-MM-yyyy", new Date())
            nights = Math.max(1, differenceInDays(checkOutDate, checkInDate))
        } catch (e) {
            console.error("Error parsing stay dates:", e)
        }
    }

    return {
        nights,
        children,
        adults
    }
}