import { clsx } from "clsx"

import PartnerLandingHeader from "../../features/partner/components/PartnerLandingHeader"
import HeroContent from "../../features/partner/components/HeroContent"
import PartnerRegisterCard from "../../features/partner/components/PartnerRegisterCard"

export default function PartnerLanding() {
    return (
        <>
            <PartnerLandingHeader />
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
                    <HeroContent />
                    <PartnerRegisterCard />
                </div>
            </div>
        </>
    )
}