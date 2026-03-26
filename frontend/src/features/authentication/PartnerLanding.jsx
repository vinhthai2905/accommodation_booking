import clsx from "clsx"

import PartnerTopHeader from "../partner/PartnerTopHeader";
import LandingPage from "../../ui/LandingPage";
import PartnerRegisterCard from "../partner/PartnerRegisterCard";

export default function PartnerLanding() {
    return (
        <>
            <PartnerTopHeader />
            <div className={clsx(
                "w-full min-h-[calc(100vh-80px)]",
                "bg-[#003b95]",
                "flex justify-center",
                "px-6 py-10"
            )}>
                <div className={clsx(
                    "w-full max-w-300",
                    "flex justify-between items-start",
                    "gap-16"
                )}>
                    <LandingPage />
                    <PartnerRegisterCard />
                </div>
            </div>
        </>
    )
}