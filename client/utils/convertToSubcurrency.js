function convertToSubcurrency(amount, factor=100) {
    console.log(amount)
    return Math.round(amount * factor)
}
export default convertToSubcurrency;