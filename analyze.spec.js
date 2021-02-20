const {
    standardDeviation,
    sanitizeAmounts,
    roundToTwoDp,
    analysePayments
} = require('./analyze.js')
const test = require('ava')

test('Standard Deviation is correct for Basic Data', t => {
    //First Argument for t.is is actual, second is expected
    t.deepEqual(standardDeviation([1, 2, 2, 2, 1, 1]), 0.5)
})

test('Payments are analysed correctly', t => {
    //First Argument for t.is is actual, second is expected
    t.deepEqual(analysePayments([{
            "Amount": 1,
            "TransactionInformation": "Payment One"
        },
        {
            "Amount": 2,
            "TransactionInformation": "Payment Two"
        },
        {
            "Amount": 3,
            "TransactionInformation": "Payment Three"
        },
        {
            "Amount": 4,
            "TransactionInformation": "Payment Four"
        }
    ]), {
        max: 4,
        mean: 2.5,
        median: 2.5,
        min: 1,
        standardDeviation: 1.12,
    })
})