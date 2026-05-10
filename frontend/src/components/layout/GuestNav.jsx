import ButtonLink from "/src/components/ui/ButtonLink"

import { Link } from "react-router"

export default function GuestNav() {
    return (
        <>
            <Link to={"/partner/landing"}>
                <span className="hover:cursor-pointer hover:underline text-white">Đăng chỗ nghỉ của quý vị</span>
            </Link>
            <ButtonLink title="Đăng nhập" to={"/auth/sign-in"} />
            <ButtonLink title="Đăng ký" to={"/auth/sign-up"} />
        </>
    )
}