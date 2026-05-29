import { useLocation, useNavigate } from "react-router"

export default function useOpenMap() {
    const location = useLocation()
    const navigate = useNavigate()

    const isMapOpened = location.hash === "#map_opened"

    const openMap = () => {
        navigate({
            pathname: location.pathname,
            search: location.search,
            hash: "map_opened",
        })
    }

    const closeMap = () => {
        navigate({
            pathname: location.pathname,
            search: location.search,
            hash: "",
        })
    }
    return {
        isMapOpened,
        openMap,
        closeMap
    }
}