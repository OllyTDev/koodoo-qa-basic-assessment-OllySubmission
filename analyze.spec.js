const {
    standardDeviation,
    sanitizeAmounts,
    roundToTwoDp,
    analysePayments
} = require('./analyze.js')
const test = require('ava')


test('SD: Standard Deviation is correct for Basic Data', t => {
    //First Argument for t.is is actual, second is expected
    t.deepEqual(standardDeviation([1, 2, 2, 2, 1, 1]), 0.5)
})

test('SD: Standard Deviation is correct for Example data', t => {
    //Assumes negative value is taken as is. May get affected should behavior of handling negative amounts changes.
    t.deepEqual(roundToTwoDp(standardDeviation([10.97, 25.95, -50, 750, 15.50])), 300.93)
})


test('sanitizeAmounts: Filter payments with no amounts', t => {

    const payment = [{
      "TransactionInformation": "Missing Amount"
    },
    {
      "Amount": 1,
      "TransactionInformation": "Hexathlon"
    }]
    const filtered = sanitizeAmounts(payment)

    const expectedOutput = [1]
    t.deepEqual(filtered, expectedOutput)
})

test('sanitizeAmounts: Filter payments where amount is NaN', t => {
  const payment = [{
    "Amount" : NaN,
    "TransactionInformation": "No Amount"
  },
  {
    "Amount": 1,
    "TransactionInformation": "JD Shorts"
  }]
  const filtered = sanitizeAmounts(payment)

  const expectedOutput = [1]
  t.deepEqual(filtered, expectedOutput)
})

test('sanitizeAmounts: Handle valid payment amounts given as strings', t => {
  const payment = [{
    "Amount" : "750",
    "TransactionInformation": "String amount"
  },
  {
    "Amount": 1,
    "TransactionInformation": "Brock City"
  }]
  const filtered = sanitizeAmounts(payment)

  const expectedOutput = [750,1]
  t.deepEqual(filtered, expectedOutput)
})

test('sanitizeAmounts: Filter out invalid payment amounts given as strings', t => {
  const payment = [{
    "Amount" : "NotANumber",
    "TransactionInformation": "String Not-a-Number"
  },
  {
    "Amount": 1,
    "TransactionInformation": "Halberts"
  }]
  const filtered = sanitizeAmounts(payment)

  const expectedOutput = [1]
  t.deepEqual(filtered, expectedOutput)
})

test('sanitizeAmounts: Filter empty payment amounts given as strings', t => {
    /*
      Some of these tests may have questions which need asking back of an analyst or product owner.
      For example, this example may actually be behaving correctly and a blank amount should be taken as zero.
      This question needs answering either way.
    */

  const payment = [{
    "Amount" : "",
    "TransactionInformation": "Empty String Amount"
  },
  {
    "Amount": 1,
    "TransactionInformation": "Dunk"
  }]
  const filtered = sanitizeAmounts(payment)

  const expectedOutput = [1]
  t.deepEqual(filtered, expectedOutput)
})

test('sanitizeAmounts: Handle payment amounts with negative values', t => {
    /*
      this test is another example of something that needs analysing.
      Should a negative be taken as is, as the absolute value of the amount, or completely filtered out as it may not valid?
      As example.json has included the negative; I have included it as expected for this test case. Although this needs verification if this behavior is correct.
      Should the behavior require changing, this test should change to match with a clearer explanation in the test title. Something like:
      Should handle payment amounts with negative values by filtering them/taking the absolute value/taken as is.
    */

    const payment = [{
      "Amount" : -50,
      "TransactionInformation": "Negative string?"
    },
    {
      "Amount": 1,
      "TransactionInformation": "2 Pie R"
    }]
    const filtered = sanitizeAmounts(payment)

    const expectedOutput = [-50,1]
    t.deepEqual(filtered, expectedOutput)
})

test('sanitizeAmounts: Handle payments with no TransactionInformation', t => {

    const payment = [{
      "Amount" : 39.99,
      "TransactionInformation": "Just a casual purchase"
    },
    {
      "Amount": 1,
    }]
    const filtered = sanitizeAmounts(payment)

    const expectedOutput = [39.99,1]
    t.deepEqual(filtered, expectedOutput)
})

test('sanitizeAmounts: Keep precision on amounts for correct calculations later', t => {
  const payment = [{
    "Amount" : 750.12345,
    "TransactionInformation": "Amount has more numbers :o"
  },
  {
    "Amount": 1,
    "TransactionInformation": "DogeCoin Investment CO"
  }]
  const filtered = sanitizeAmounts(payment)

  const expectedOutput = [750.12345,1]
  t.deepEqual(filtered, expectedOutput)
})

test('roundToTwoDp: Round values to 2 dp for Basic Data', t => {

    t.deepEqual(roundToTwoDp(0.044), 0.04) //round down
    && t.deepEqual(roundToTwoDp(1.075), 1.08) //round up
    && t.deepEqual(roundToTwoDp(2.078123456789123456789123456789123456789), 1.08) //round up with extreme number of digits
    && t.deepEqual(roundToTwoDp(78123456789123456789123456789123456789.164), 78123456789123456789123456789123456789.16) //round down with extreme preceeding values
})

test('roundToTwoDp: Round values to 2 dp for negatives', t => {

    t.deepEqual(roundToTwoDp(-0.032), -0.03) //round down
    && t.deepEqual(roundToTwoDp(-1.067), -1.07) //round up
})

test('analysePayments: Payments are analysed correctly for Basic Data', t => {
    //First Argument for t.is is actual, second is expected
    const inputPayments = [{
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
    ]
    const expectedOutput = {
        max: 4,
        mean: 2.5,
        median: 2.5,
        min: 1,
        standardDeviation: 1.12,
    }

    t.deepEqual(analysePayments(inputPayments),expectedOutput)

})

test('analysePayments: Payments are analysed correctly for Example Data', t => {
  const fs = require('fs')
  const exampleData = require('./example.json')

  const expectedOutput = {
      max: 750,
      mean: 150.48,
      median: 15.5,
      min: -50,
      standardDeviation: 300.93,
  }

  t.deepEqual(analysePayments(exampleData), expectedOutput)
})

test('analysePayments: Payments output is rounded to 2 decimal places (with amounts all to 2 dp)', t => {
  const inputPayments = [{
        "Amount": 1.01,
        "TransactionInformation": "Payment One"
    },
    {
        "Amount": 2.03,
        "TransactionInformation": "Payment Two"
    },
    {
        "Amount": 4.06,
        "TransactionInformation": "Payment Three"
    },
    {
        "Amount": 8.09,
        "TransactionInformation": "Payment Four"
    }
  ]

  const expectedOutput = {
      max: 8.09,
      mean: 3.8,
      median: 3.05,
      min: 1.01,
      standardDeviation: 2.71,
  }

  t.deepEqual(analysePayments(inputPayments), expectedOutput)
})

test('analysePayments: Payments output is rounded to 2 decimal places (with amounts to various DPs)', t => {
  const inputPayments = [{
        "Amount": 1.0001,
        "TransactionInformation": "Payment One"
    },
    {
        "Amount": 2,
        "TransactionInformation": "Payment Two"
    },
    {
        "Amount": 50.27951,
        "TransactionInformation": "Payment Three"
    },
    {
        "Amount": 7.11,
        "TransactionInformation": "Payment Four"
    }
  ]

  const expectedOutput = {
      max: 50.28,
      mean: 15.10,
      median: 4.60,
      min: 1.00,
      standardDeviation: 20.44,
  }

  t.deepEqual(analysePayments(inputPayments), expectedOutput)
})
