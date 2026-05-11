import { useNavigate } from "react-router"
import { parseHotelSearchParams } from "../../helpers/search/parseHotelSearchParams"

export default function useHotelSearchSubmit({ selectedPlace, isPlaceSelected, setShowLocationError, ranges, guestOptions }) {
    const navigate = useNavigate()

    const handleSearchSubmit = (e) => {
        e.preventDefault()

        if (!isPlaceSelected || !selectedPlace) {
            setShowLocationError(true)
            return
        }

        const params = parseHotelSearchParams(selectedPlace, ranges, guestOptions)

        navigate(`/searchresults?${params.toString()}`)
    }

    return {
        handleSearchSubmit
    }
}