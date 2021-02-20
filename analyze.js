const R = require('ramda')

const sanitizeAmounts = (payments) => {
    return R.map(object => +object.Amount, R.filter(object => 'Amount' in object, payments))
}

const roundToTwoDp = (number) => {
    return Math.round(number * 100) / 100
}

const standardDeviation = R.compose(roundToTwoDp, Math.sqrt, R.mean, array => {
    const mean = R.mean(array);
    return R.map(value => Math.pow(value - mean, 2), array)
})

const analysePayments = (payments) => {
    const sanitizedPayments = sanitizeAmounts(payments)

    return {
        min: Math.min(...sanitizedPayments),
        mean: roundToTwoDp(R.mean(sanitizedPayments)),
        median: R.median(sanitizedPayments),
        max: Math.max(...sanitizedPayments),
        standardDeviation: standardDeviation(sanitizedPayments)
    }
}

module.exports = {
    sanitizeAmounts,
    standardDeviation,
    analysePayments,
    roundToTwoDp
}
