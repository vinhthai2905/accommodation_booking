import { useEffect } from "react"

export function useTabTitle(title) {
    useEffect(() => {
        document.title = title
    })
}