import { useNavigate } from "react-router"
import { parseHotelSearchParams } from "../../../helpers/search/parseHotelSearchParams"


export default function useHotelSearchSubmit({
    selectedPlace,
    isPlaceSelected,
    ranges,
    guestOptions,
    setIsGuestOpened,
    setShowLocationError,
    setIsAgeInputError
}) {
    const navigate = useNavigate()

    const handleSearchSubmit = (e) => {
        e.preventDefault()

        if (!isPlaceSelected || !selectedPlace) {
            setShowLocationError(true)
            return
        }

        if (guestOptions.children > 0) {
            const selectedAges = (guestOptions.childrenAge || []).filter(age => age !== undefined && age >= 0);
            if (selectedAges.length !== guestOptions.children) {
                setIsGuestOpened(true)
                setIsAgeInputError(true)
                return
            }
        }


        const params = parseHotelSearchParams(selectedPlace, ranges, guestOptions)

        window.open(
            `/searchresults?${params.toString()}`,
            "_blank"
        )
    }

    return {
        handleSearchSubmit
    }
}