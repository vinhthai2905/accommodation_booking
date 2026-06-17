import { useQuery } from "@tanstack/react-query"
import { fetchUserProfile } from "../../../services/user/userServices"

export default function useUserProfile() {
    const accessToken = localStorage.getItem("access_token")

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
        enabled: !!accessToken,
        staleTime: 1000 * 60 * 5,
    })

    return { userProfile: data, isPending, isError, error }
}
