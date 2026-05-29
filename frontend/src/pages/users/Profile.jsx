import ProfileHeader from "../../features/profile/components/user-profile-badge/ProfileHeader"

import { Outlet } from "react-router"
import { useContext } from "react"

import { AuthUserContext } from "../../context/authentication/AuthUserContext"

export default function Profile() {
    const { isAuthenticated} = useContext(AuthUserContext)

    return (
        <>
            <ProfileHeader isAuthenticated={isAuthenticated}/>
            <Outlet />
        </>
    )
}