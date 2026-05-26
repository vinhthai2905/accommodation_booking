import { useNavigate } from "react-router"


export function useClickNavigationHotel({ setIsOpenBumblebee }) {
    const navigate = useNavigate()

    const handleHotelClick = (slug, id_hotel) => {
        setIsOpenBumblebee(false)
        navigate(`/hotel/${slug}/${id_hotel}`)
    }

    return {
        handleHotelClick
    }
}