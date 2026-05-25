import { useLocation } from "react-router"
import { useQuery } from "@tanstack/react-query"

import { useSearchHotelsParamsMap } from "./useSearchHotelsParamsMap"
import { fetchHotelResultMap } from "../../../services/search/searchHotelsServices"

export default function useSearchHotelsMap(isMapOpened, mapBounds) {
    const { searchHotelsParamsMap } = useSearchHotelsParamsMap(mapBounds)

    const location = useLocation()

    const { isPending, error, data } = useQuery({
        queryKey: ["fetchHotelsResultMap", searchHotelsParamsMap.toString(), location.key],
        queryFn: (() => fetchHotelResultMap(searchHotelsParamsMap)),
        enabled: !!isMapOpened && !!mapBounds
    })

    return {
        isPending,
        error,
        data
    }

}