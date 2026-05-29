import { useReducer } from "react"

function toggleOnlyNav(navStates, selectedNav) {
    const states = Object.keys(navStates)

    const newNavStates = states.reduce((newNavStates, currentNav) => {
        const isSelectedNav = currentNav === selectedNav ? !navStates[currentNav] : false
        newNavStates[currentNav] = isSelectedNav

        return newNavStates
    },
        {}
    )

    return newNavStates
}

const initialNavStates = {
    hotel: false,
    image: false,
    booking: false,
    roomType: false,
    policy: false
}

function navReducer(navStates, action) {
    switch (action.type) {
        case "TOGGLE_NAV":
            return toggleOnlyNav(navStates, action.payload)

        case "CLOSE_ALL_NAV":
            return initialNavStates

        default:
            return navStates
    }

}

export default function useToggleNavSection() {
    const [navStates, dispatch] = useReducer(navReducer, initialNavStates)

    const toggleHotelNav = () => {
        dispatch({ type: "TOGGLE_NAV", payload: "hotel" })
    }

    const toggleImgNav = () => {
        dispatch({ type: "TOGGLE_NAV", payload: "image" })
    }

    const toggleBookingNav = () => {
        dispatch({ type: "TOGGLE_NAV", payload: "booking" })
    }

    const toggleRoomTypeNav = () => {
        dispatch({ type: "TOGGLE_NAV", payload: "roomType" })
    }

    const togglePolicyNav = () => {
        dispatch({ type: "TOGGLE_NAV", payload: "policy" })
    }

    const closeAllNav = () => {
        dispatch({ type: "CLOSE_ALL_NAV" })
    }

    const isRoomTypeActive = location.pathname === "/partner/dashboard/hotel/room-type"

    return {
        navStates,
        isRoomTypeActive,
        toggleHotelNav,
        toggleImgNav,
        toggleBookingNav,
        toggleRoomTypeNav,
        togglePolicyNav,
        closeAllNav
    }
}