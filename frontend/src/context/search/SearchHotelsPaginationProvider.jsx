import { useState } from "react";
import { SearchHotelsPaginationContext } from "./SearchHotelsPaginationContext";

export default function SearchHotelsPaginationProvider({ children }) {
    const [currentPage, setCurrentPage] = useState(1)

    const hotelsPaginationContext = {
        currentPage,
        setCurrentPage,
    }

    return (
        <SearchHotelsPaginationContext value={hotelsPaginationContext}>
            {children}
        </SearchHotelsPaginationContext>
    )
}