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
        staleTime: 20 * 60 * 1000,
        enabled: !!token
    })

    return {
        isLoading,
        error,
        data
    }
}