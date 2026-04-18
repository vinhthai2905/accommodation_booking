import { useQuery } from "@tanstack/react-query"

export default function useRefreshUser(fetchUserState) {
    const { isPending, error, data } = useQuery({
        queryKey: ["fetchUser"],
        queryFn: () => {
            if (localStorage.getItem("access_token")) {
                return fetchUserState()
            }
        }
    })

    return {
        isPending,
        error,
        data
    }
}