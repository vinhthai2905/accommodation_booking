import { useQuery } from "@tanstack/react-query"

export default function useRefreshUser(fetchAuthUserState) {
    const token = localStorage.getItem("access_token")
    const { isLoading, error, data } = useQuery({
        queryKey: ["fetchUser"],
        queryFn: () => {
            if (token) {
                return fetchAuthUserState()
            }
        },
        enabled: !!token
    })

    return {
        isLoading,
        error,
        data
    }
}