import Header from "./Header"
import Home from "./pages/Home"
import Footer from "./Footer"

export default function AppLayout() {
    return (
        <>
            <Header userFor={"user"}/>
            <Home />
            <Footer />
        </>
    )
}