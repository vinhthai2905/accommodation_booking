import { useEffect, useRef } from "react";

export function useHotelsMapCacheRef(hotelsMap) {
    const hotelsMapCacheRef = useRef(new Map())

    useEffect(() => {
        if (!hotelsMap || hotelsMap.length === 0) return

        hotelsMap.forEach(hotel => {
            hotelsMapCacheRef.current.set(hotel.id_hotel, hotel)
        })

    }, [hotelsMap])

    return {
        hotelsMapCacheRef
    }
}