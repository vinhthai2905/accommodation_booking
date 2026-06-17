import { useSearchParams } from "react-router"

export function useSearchHotelsParams(currentPage) {
    const [searchParams] = useSearchParams()

    const searchHotelsParams = new URLSearchParams({
        check_in: searchParams.get("check_in") || "",
        check_out: searchParams.get("check_out") || "",
        location: searchParams.get("location") || "",
        rooms: searchParams.get("rooms") || "",
        adults: searchParams.get("adults") || "",
        children: searchParams.get("children") || "0",
        page: currentPage,
    })

    if (Number(searchParams.get("children")) >= 1) {
        searchParams.getAll("age").forEach(age => {
            searchHotelsParams.append("age", age)
        })
    }
 
    return {
        searchHotelsParams
    }
}