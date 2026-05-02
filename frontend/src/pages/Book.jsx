import BookHeader from "../features/book/components/BookHeader"
import CheckoutProcess from "../features/book/pages/CheckoutProcess"
import LoadingScreen from "../components/ui/LoadingScreen"

import { useContext } from "react"
import { AuthUserContext } from "../context/AuthUserContext"

export default function Book() {
    const { isAuthenticated, isFetchingUser } = useContext(AuthUserContext)

     if (isFetchingUser)
        return <LoadingScreen />

    return (
        <>
            <BookHeader isAuthenticated={isAuthenticated}/>
            <CheckoutProcess/>
        </>
    )
}