# Koodoo QA Engineer Technical Assessment
---
## Introduction
If you're reading this, then congrats! We're pleased with what we've seen so far of you, and hare pleased you're considering joining out Koodoo tech team! This is a small technical/aptitude challenge to get us more aquainted with how you think about problems and give us a basic understanding of your technical skills.

## The Role
As a junior QA in Koodoo, we hope for you to have:
* A basic understanding of a programming language (Don't worry too much if you're not a JS expert for this!)
* A good comprehension of various test types and processes
* A critical and analytical mindset that lends itself to thinking about how to test software
* The pragmatism to work out where confidence is most needed, and where it is less important
* Some experience with writing tests for software

## The Problem
In order to get a mortgage, one of the most important things to be taken into account is affordability; the ability for your salary to pay for the monthly payments of the product, taking into account your expenditure and outgoings. To give deeper insights into an end-user's affordability, Koodoo are teaming up with "Totally reliable and definitely not made up financial services", or TRSNMUFS for short.

Their APIs provide breakdowns and information on end-user's payment histories, and the software you are going to be testing performs some basic mathematical analysis on the data that we receive from them, to get some insight into the payments they make on a monthly basis.

## The Solution
In order to generate this analysis, the software needs to predominantly do three things:
* **Sanitize the incoming data to a usable format**; The company that provide the data for us (TRSNMUFS) get it from a variety of different sources, and there are often differences in how different sources report this data to TRSNMUFS, in addition to this, TRSNMUFS themselves have often previously sent us data in formats/shapes/types we did not expect, so we need to be really vigilant about how we process this. There is an example in the repository (example.json which gives you an idea how this data looks and its consistency):
```
[
    {
        "Amount": 10.97,
        "TransactionInformation": "50 Dogs Bar"
    },
    {
        "TransactionInformation": "Bank Account Verification"
    },
    {
        "Amount": 25.95,
        "TransactionInformation": "Shorts Direct"
    },
    {
        "Amount": -50
    },
    {
        "Amount": "750",
        "TransactionInformation": "Koodoo Mortgage Co."
    },
    {
        "Amount": 15.50,
        "TransactionInformation": "Barrel Flop"
    }
]
```
* **Perform calculations on the sanitized data**; Once the data is in a more usable format and we have removed any unusable payments, we need to perform calculations on it. The required output for this analysis includes: Minimum, Maximum, Mean, Median, and Standard Deviation.
* **Return the result of the calculations in a format to be ingested by another API/Function/System**; The output needs to take the below shape (with each field rounded to 2 decimal places):
```
    {
        min: 1,
        max: 1,
        median: 1,
        mean: 1,
        standardDeviation: 1
    }
```
The analysis software uses a mix between Node JS' built in Math library, and an external functional programming suite, Ramda.

## Your Job
What is your role in this? It needs to be tested! We need you to come up with some tests for this software that give us a good level of confidence that it is working as expected, and will not break or produce unexpected results. The timeline for getting this hypothetical software out is very tight, so we only have time to set up and run so many tests.

The current tooling we use to test software is Ava, and your job is to write no more than 20 tests in the .spec.js file provided to give us a good level of confidence on the software at hand!

You have three files provided for you:
* **analyze.js**; The software produced to parse, analyse, and return the data sent to us by TRSNMUFS.
* **analyze.spec.js**; The test file you will be using to write your tests in. It even has two example tests which should give you a basic idea of the structure of the tests that Ava uses, and you should just be able to copy/paste the tests changing the input to scenarios you want. You can even leave these two tests as part of your 20 tests if you think they give you a good level of confidence with your tests.
* **example.json**; An example of the sort of thing we get from TRSNMUFS, giving you a basic overview of what their data looks like. This might help you come up with some scenarios to cover. It will always take the form of an array of payment objects.

If you're not familiar with javascript, its worth noting that you don't need to bother touching the other files and directories (The two package json files, the readme, the gitignore, or node modules).

Preferrably you would submit this in the form of a github repository.

To get started, you'll need to have [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)., [node](https://nodejs.org/en/download/), and [npm](https://www.npmjs.com/get-npm) installed. Pull the repository with `git clone [REPO URL]`, run `npm install` in the folder that this creates, and you should be able to run your tests with `npx ava`.

If you have any issues getting ava to run it might help [installing it separately](https://github.com/avajs/ava)

**Some helpful things:**
* You don't need to know Javascipt, AVA, or Ramda to do this exercise. It will definitely help if you are familiar with JSON, as ultimately that's what form your tests will likely take; JSON input to JSON output. In all reality, your tests don't need to pass, they don't need to find bugs, and they don't even need to run (Although it would be a plus!). We just want to see how you approach the problem and what you think is important to test here.
* You don't need to be a statistician either, and we won't penalise you for not calculating these things, we're mostly looking to see what you decide to test in your **inputs**! If you need something to save time, there are a bunch of calculators for these things out there, like [this](https://www.mathsisfun.com/data/standard-deviation-calculator.html).
* You don't even need to read through the code, but if you try to understand it you might already spot some things that would break it. Don't get bogged down trying to figure out everything it does, as all you need to test it is your brain and an understanding of what it's supposed to do.
* Think carefully about what you want to test; There is a good mix of in-house code, external libraries, and node JS internal libraries here, and a lot of different ways in which the data can look. Think about what has the least level of confidence and edge cases that need to be covered. Think about boundary values and unhappy paths and use your knowledge of things like TDD and unit testing.
* There are definitely bugs in the code, so your tests may not all pass if you do actually want to run them. If you do find any bugs please raise them! You can do this by email, in a note file, or however you want! Again, don't be discouraged if you don't see or find anything. The important thing here is seeing what you think is important to test.

**We look forward to seeing what you come up with!**