export const getChildrenAgeParams = (searchParams) => {
    return searchParams.getAll("age").map(age => age)
}