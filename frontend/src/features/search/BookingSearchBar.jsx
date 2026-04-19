import BookingSearchInput from "./BookingSearchInput"
import DestinationSearch from "./DestinationSearch"
import DateSearch from "./DateSearch"
import GuestSearch from "./GuestSearch"

import { MapPin, Calendar, Users } from "lucide-react"

import { clsx } from "clsx"
import { useState } from "react"
import { format } from "date-fns"
import { startOfDay } from "date-fns";

import useClickOutside from "../../hooks/useClickOutside"

export default function BookingSearchBar() {
    const [isLocationOpened, setIsLocationOpened] = useState(false)
    const { ref: placeRef } = useClickOutside(setIsLocationOpened)
    const [selectedPlace, setSelectedPlace] = useState("")


    const [isDateOpened, setIsDateOpened] = useState(false)
    const { ref: dateRef } = useClickOutside(setIsDateOpened)
    const [ranges, setRanges] = useState([
        {
            startDate: startOfDay(new Date()),
            endDate: startOfDay(new Date()),
            key: "bookingDate",
        },
    ])

    const [isGuestOpened, setIsGuestOpened] = useState(false)
    const { ref: guestRef } = useClickOutside(setIsGuestOpened)
    const [guestOptions, setGuestOptions] = useState({
        adults: 1,
        rooms: 1
    })


    return (
        <form className={clsx(
        )}>
            <div className={clsx(
                "flex",
                "bg-orange-300 rounded-md w-[20%]",
                "xl:flex-row",
                "md:flex-col md:w-full",
                "translate-y-1/2"
            )}>
                <BookingSearchInput
                    inputInfo={"Khu vực bạn muốn ở?"}
                    inputFor={"text"}
                    ref={placeRef}
                    value={selectedPlace}
                    onClick={() => setIsLocationOpened(!isLocationOpened)}
                    onChange={(e) => setSelectedPlace(e.target.value)}
                    icon={MapPin}
                >
                    {isLocationOpened && (
                        <DestinationSearch
                            onSelect={(place) => {
                                setSelectedPlace(place);
                                setIsLocationOpened(false);
                            }}
                        />
                    )}
                </BookingSearchInput>

                <BookingSearchInput
                    inputInfo={""}
                    inputFor={"text"}
                    ref={dateRef}
                    onClick={() => setIsDateOpened(!isDateOpened)}
                    onChange={() => {}}
                    value={`${format(ranges[0].startDate, "dd/MM/yyyy")} - ${format(ranges[0].endDate, "dd/MM/yyyy")}`}
                    icon={Calendar}
                >
                    {isDateOpened && (
                        <DateSearch
                            ranges={ranges}
                            setRanges={setRanges}
                        />
                    )}
                </BookingSearchInput>

                <BookingSearchInput 
                    inputFor={"text"} 
                    ref={guestRef}
                    onClick={() => setIsGuestOpened(!isGuestOpened)}
                    value={`${guestOptions.adults} adult${guestOptions.adults > 1 ? "s" : ""} · ${guestOptions.rooms} room${guestOptions.rooms > 1 ? "s" : ""}`}
                    icon={Users} 
                >
                    {isGuestOpened && (
                        <GuestSearch
                            guestOptions={guestOptions}
                            setGuestOptions={setGuestOptions}
                            onDone={() => setIsGuestOpened(false)}
                        />
                    )}
                </BookingSearchInput>

                <div className={clsx(
                    "px-6 py-2 bg-blue-500 border-orange-300 rounded-md border-2",
                    "hover:bg-blue-600 hover:cursor-pointer",
                    "md:py-4",
                )}>
                    <button type="submit">Tìm</button>
                </div>

            </div>

        </form>
    )
}