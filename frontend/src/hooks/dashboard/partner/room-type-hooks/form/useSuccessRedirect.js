
import { useEffect } from "react"

export default function useSucessRedirect(mutation, navigate, redirectTo) {
    const { isSuccess } = mutation

    useEffect(() => {
        if (isSuccess) {
            navigate(`${redirectTo}`)
        }
    }, [isSuccess, navigate, redirectTo])


}