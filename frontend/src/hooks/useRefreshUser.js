import { useQuery } from "@tanstack/react-query"

export default function useRefreshUser(fetchUserState) {
    const token = localStorage.getItem("access_token")
    const { isPending, error, data } = useQuery({
        queryKey: ["fetchUser"],
        queryFn: () => {
            if (token) {
                return fetchUserState()
            }
        },
        enabled: !!token
    })

    return {
        isPending,
        error,
        data
    }
}