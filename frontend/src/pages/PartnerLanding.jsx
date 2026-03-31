import clsx from "clsx"

import PartnerTopHeader from "/src/features/partner/PartnerTopHeader";
import HeroContent from "/src/features/partner/HeroContent";
import PartnerRegisterCard from "/src/features/partner/PartnerRegisterCard";

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
                    <HeroContent />
                    <PartnerRegisterCard />
                </div>
            </div>
        </>
    )
}