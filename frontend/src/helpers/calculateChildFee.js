export const calculateChildFee = (maxFreeAge, maxSurchargeAge, surchargeAmout, children) => {
    let childFees = 0

    children.forEach(childAge => {
        if (childAge > maxFreeAge && childAge < maxSurchargeAge)
            childFees = childFees + Number(surchargeAmout)
    })

    return childFees
}