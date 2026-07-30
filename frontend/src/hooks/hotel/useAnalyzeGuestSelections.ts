export default function useAnalyzeGuestSelections(
    bookingSearchParams: URLSearchParams,
    childPolicy, 
    selectedRoomIds, 
    maxCapacitySelected
) {
    const adults = bookingSearchParams.get("adults")
    const childrenAges = bookingSearchParams.getAll("age")
    const numAdults = parseInt(adults || "0")

    let childrenAdultCount = 0
    let childrenFreeStayCount = 0

    if (childPolicy && childrenAges.length > 0) {
        childrenAges.forEach(age => {
            const ageNum = parseInt(age)
            if (ageNum >= childPolicy.adult_age_from) {
                childrenAdultCount += 1
                return
            }

            if (ageNum < childPolicy.max_free_age) {
                childrenFreeStayCount += 1
                return
            }
        })
    }

    const adultEquivalentGuestCount = numAdults + childrenAdultCount
    const isOverCapacity = selectedRoomIds.length > 0 && adultEquivalentGuestCount > maxCapacitySelected

    return {
        numAdults, 
        childrenAges, 
        isOverCapacity, 
        adultEquivalentGuestCount
    }
}