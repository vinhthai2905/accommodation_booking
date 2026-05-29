import { useSearchParams } from "react-router"

export function useSearchHotelsParamsMap(mapBounds) {
    const [searchParams] = useSearchParams()

    const searchHotelsParamsMap = new URLSearchParams({
        check_in: searchParams.get("check_in") || "",
        check_out: searchParams.get("check_out") || "",
        location: searchParams.get("location") || "",
        rooms: searchParams.get("rooms") || "",
        adults: searchParams.get("adults") || "",
        children: searchParams.get("children") || "0",
    })

    if (Number(searchParams.get("children")) >= 1) {
        searchParams.getAll("age").forEach(age => {
            searchHotelsParamsMap.append("age", age)
        })
    }

    if (!mapBounds) {
        return {
            searchHotelsParamsMap
        }
    }
    else {
        searchHotelsParamsMap.set("north", String(mapBounds.north))
        searchHotelsParamsMap.set("south", String(mapBounds.south))
        searchHotelsParamsMap.set("east", String(mapBounds.east))
        searchHotelsParamsMap.set("west", String(mapBounds.west))
        searchHotelsParamsMap.set("zoom", String(mapBounds.zoom))
    }

    return {
        searchHotelsParamsMap
    }
}