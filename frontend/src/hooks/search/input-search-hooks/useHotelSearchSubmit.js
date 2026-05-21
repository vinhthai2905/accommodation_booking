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

        // if (guestOptions.children + 1 !== guestOptions.childrenAge.length){
        //     setIsGuestOpened(true)
        //     setIsAgeInputError(true)
        //     return
        // }


        const params = parseHotelSearchParams(selectedPlace, ranges, guestOptions)

        navigate(`/searchresults?${params.toString()}`)
    }

    return {
        handleSearchSubmit
    }
}