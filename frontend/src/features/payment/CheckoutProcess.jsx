import { clsx } from "clsx"
import { motion } from "framer-motion"

import CheckoutSteps from "./CheckoutSteps"
import CheckoutSummary from "./CheckoutSummary"

export default function CheckoutProcess({ currentStep = 2 }) {
    return (
        <motion.main
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
        >
            <div className={clsx(
                "flex flex-col gap-3 mt-5 xl:mx-[20%]",
            )}>
                <CheckoutSteps currentStep={currentStep} />
                <CheckoutSummary />
            </div>
        </motion.main>
    )
}