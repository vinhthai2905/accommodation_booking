interface PersonalInfo {
    first_name: string,
    last_name: string,
    phone_number: string
}

export interface User {
    email: string,
    personal_info: PersonalInfo,
    role: string,
    verified_at: string | null
}

export interface AuthUserContextInterface {
    user: User | null,
    isFetchingUser: boolean,
    setAuthUserState: (
        access_token: string,
        email: User["email"],
        personal_info: User["personal_info"],
        role: User["role"],
        verified_at: User["verified_at"]
    ) => void,
    clearAuthUserState: () => Promise<void>,
    isAuthenticated: boolean,
    isVerified: boolean,
    accessToken: string | null
}