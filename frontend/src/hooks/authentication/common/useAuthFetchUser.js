import { useQuery } from "@tanstack/react-query"

export default function useAuthFetchUser(fetchAuthUserState) {
    const token = localStorage.getItem("access_token")
    
    const { isPending, error, data } = useQuery({
        queryKey: ["fetchAuthUser"],
        queryFn: () => {
            return fetchAuthUserState()
        },
        staleTime: 20 * 60 * 1000,
        enabled: !!token
    })

    return {
        isPending,
        error,
        data,
        accessToken: token
    }
}