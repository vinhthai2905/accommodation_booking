import { useContext } from "react"
import BookHeader from "../features/book/components/BookHeader"
import CheckoutProcess from "../features/book/pages/CheckoutProcess"
import { AuthUserContext } from "../context/AuthUserContext"

export default function Book() {
    const { isAuthenticated } = useContext(AuthUserContext)
    
    return (
        <>
            <BookHeader isAuthenticated={isAuthenticated}/>
            <CheckoutProcess isAuthenticated={isAuthenticated}/>
        </>
    )
}