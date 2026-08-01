import { AxiosError } from "axios";
import { ErrorFetchUserResponse } from "../../types/authentication/api/apiErrorResponse";

export function isTokenExpired(error: AxiosError<ErrorFetchUserResponse>) {
    if (error.response) {
        const { messages } = error.response.data
        const { message } = messages[0]

        if (message === "Token is expired") return true
    }
}