import BookingSearchInput from "../components/BookingSearchInput"

import PlaceSearchDropdown from "./PlaceSearchDropdown"
import DateSearchDropdown from "./DateSearchDropdown"
import GuestSearchDropdown from "./GuestSearchDropdown"

import ErrorLocationInput from "../components/ErrorLocationInput"

import { useNavigate } from "react-router"
import { clsx } from "clsx"
import { MapPin, Calendar, Users } from "lucide-react"
import { format } from "date-fns"

import useLocationInput from "../../../hooks/search/useLocationInput"
import useBookingDateInput from "../../../hooks/search/useBookingDateInput"
import useGuestOptionInput from "../../../hooks/search/useGuestOptionInput"


export default function BookingSearchBar() {
    const {
        isLocationOpened,
        setIsLocationOpened,
        isPlaceSelected,
        setIsPlacedSelected,
        selectedPlace,
        setSelectedPlace,
        placeRef,
        showLocationError,
        setShowLocationError
    } = useLocationInput()
    
    const {
        isDateOpened,
        setIsDateOpened,
        ranges,
        setRanges,
        dateRef
    } = useBookingDateInput()


    const {
        isGuestOpened,
        setIsGuestOpened,
        guestOptions,
        setGuestOptions,
        guestRef,
        showAgeError,
        setShowAgeError
    } = useGuestOptionInput()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!isPlaceSelected || !selectedPlace) {
            setShowLocationError(true)
            return
        }

        const params = new URLSearchParams({
            checkIn: format(ranges[0].startDate, "dd-MM-yyyy"),
            checkOut: format(ranges[0].endDate, "dd-MM-yyyy"),
            location: selectedPlace,
            rooms: guestOptions.rooms,
            adults: guestOptions.adults,
            ...(guestOptions.children >= 1 && {
                children: guestOptions.children,

            }),
        })

        navigate(`/searchresults?${params.toString()}`)
    }


    return (
        <form
            search-box={"booking-search-bar"}
            onSubmit={handleSubmit}
        >
            <div className={clsx(
                "flex",
                "bg-orange-300 rounded-md w-[20%]",
                "xl:flex-row",
                "md:flex-col md:w-full",
                "translate-y-1/2"
            )}>
                <BookingSearchInput
                    name={"location"}
                    inputFor={"text"}
                    ref={placeRef}
                    value={selectedPlace}
                    onClick={() => {
                        setIsLocationOpened(!isLocationOpened)
                        setShowLocationError(false)
                    }}
                    onChange={(e) => {
                        setSelectedPlace(e.currentTarget.value)
                        setIsPlacedSelected(true)
                    }}
                    icon={MapPin}
                >
                    {isLocationOpened && (
                        <PlaceSearchDropdown
                            onSelect={(place) => {
                                setSelectedPlace(place)
                                setIsLocationOpened(false)
                                setIsPlacedSelected(true)
                            }}
                        />
                    )}
                    {showLocationError && (
                        <ErrorLocationInput />
                    )}
                </BookingSearchInput>

                <BookingSearchInput
                    name={"bookingDate"}
                    inputFor={"text"}
                    ref={dateRef}
                    onClick={() => setIsDateOpened(!isDateOpened)}
                    onChange={() => { }}
                    value={`${format(ranges[0].startDate, "dd/MM/yyyy")} - ${format(ranges[0].endDate, "dd/MM/yyyy")}`}
                    icon={Calendar}
                >
                    {isDateOpened && (
                        <DateSearchDropdown
                            ranges={ranges}
                            setRanges={setRanges}
                        />
                    )}
                </BookingSearchInput>

                <BookingSearchInput
                    name={"guestOption"}
                    inputFor={"text"}
                    ref={guestRef}
                    onClick={() => setIsGuestOpened(!isGuestOpened)}
                    value={`${guestOptions.adults} Người lớn - ${guestOptions.children} Trẻ em - ${guestOptions.rooms} Phòng`}
                    icon={Users}
                >
                    {isGuestOpened && (
                        <GuestSearchDropdown
                            guestOptions={guestOptions}
                            setGuestOptions={setGuestOptions}
                            onDone={() => setIsGuestOpened(false)}
                        />
                    )}
                </BookingSearchInput>

                <button
                    className={clsx(
                        "px-6 py-2 bg-blue-500 border-orange-300 rounded-md border-2",
                        "hover:bg-blue-600 cursor-pointer",
                        "md:py-4",
                    )}
                    type="submit"
                >
                    Tìm
                </button>

            </div>

        </form>
    )
}