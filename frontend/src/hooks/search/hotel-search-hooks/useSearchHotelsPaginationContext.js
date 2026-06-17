import { useContext } from "react"

import { SearchHotelsPaginationContext } from "../../../context/search/SearchHotelsPaginationContext"

export default function useSearchHotelsPaginationContext() {
    const searchHotelsPaginationContext = useContext(SearchHotelsPaginationContext)

    return searchHotelsPaginationContext
}