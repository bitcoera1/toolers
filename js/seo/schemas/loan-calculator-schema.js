/*!
 * ==========================================================
 * ToolXone Loan Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Loan Calculator.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

    "use strict";


    /* ==========================================================
       PAGE SCHEMA
    ========================================================== */

    const LoanCalculatorSchema =
        Object.freeze({

            version: "1.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "Loan Calculator - Monthly Payment & Interest Calculator | ToolXone",

                    description:
                        "Use ToolXone's free Loan Calculator to estimate monthly loan payments, total interest and total repayment for fixed-rate loans. Compare loan amounts, rates and terms instantly."

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/loan-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone Loan Calculator"

                },


                mobile: {

                    appleTitle:
                        "Loan Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "Loan Calculator - Monthly Payment & Interest Calculator | ToolXone",

                    description:
                        "Estimate monthly loan payments, total interest and total repayment with ToolXone's free Loan Calculator. Compare different loan amounts, interest rates and repayment terms.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/loan-calculator.html",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageWidth:
                        797,

                    imageHeight:
                        335,

                    imageAlt:
                        "ToolXone Loan Calculator",

                    siteName:
                        "ToolXone",

                    locale:
                        "en_US"

                },


                twitter: {

                    card:
                        "summary_large_image",

                    site:
                        "@ToolXone",

                    title:
                        "Loan Calculator - Monthly Payment & Interest Calculator | ToolXone",

                    description:
                        "Calculate monthly loan payments, total interest and total repayment with ToolXone's free online Loan Calculator.",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageAlt:
                        "ToolXone Loan Calculator"

                }

            },


            /* ======================================================
               STRUCTURED DATA
            ====================================================== */

            schema: {

                organization: {

                    name:
                        "ToolXone",

                    url:
                        "https://www.toolxone.com/"

                },


                website: {

                    name:
                        "ToolXone",

                    url:
                        "https://www.toolxone.com/"

                },


                webpage: {

                    name:
                        "Loan Calculator",

                    url:
                        "https://www.toolxone.com/loan-calculator.html",

                    description:
                        "Calculate monthly loan payments, total interest and total repayment and learn how loan principal, interest rates, repayment terms and amortization work."

                },


                application: {

                    name:
                        "ToolXone Loan Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "Loan Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/loan-calculator.html",

                    description:
                        "Free online loan calculator for estimating monthly loan payments, total interest and total repayment for fixed-rate loans.",

                    isAccessibleForFree:
                        true,

                    offers: {

                        "@type":
                            "Offer",

                        price:
                            "0",

                        priceCurrency:
                            "USD"

                    }

                },


                breadcrumbs: [

                    {

                        name:
                            "Home",

                        url:
                            "https://www.toolxone.com/"

                    },

                    {

                        name:
                            "Loan Calculator",

                        url:
                            "https://www.toolxone.com/loan-calculator.html"

                    }

                ],


                faq: [

                    {

                        question:
                            "What is a loan calculator?",

                        answer:
                            "A loan calculator is a financial planning tool that estimates loan repayment based on the amount borrowed, interest rate, and repayment term. It can show the estimated monthly payment, total interest, and total amount repaid."

                    },

                    {

                        question:
                            "How is the monthly loan payment calculated?",

                        answer:
                            "For a standard fixed-rate amortizing loan, the monthly payment is calculated using the loan principal, monthly interest rate, and total number of monthly payments. Each payment contributes toward interest and repayment of the principal."

                    },

                    {

                        question:
                            "What does loan principal mean?",

                        answer:
                            "The principal is the original amount of money borrowed before interest and other borrowing costs are added."

                    },

                    {

                        question:
                            "What is the annual interest rate?",

                        answer:
                            "The annual interest rate is the percentage rate charged on the loan each year. This calculator converts the entered annual rate into a monthly rate when estimating monthly payments."

                    },

                    {

                        question:
                            "How does the loan term affect my monthly payment?",

                        answer:
                            "A longer repayment term generally lowers the monthly payment because repayment is spread across more months, but it can increase the total interest paid. A shorter term generally produces higher monthly payments but can reduce total interest."

                    },

                    {

                        question:
                            "Can I enter the loan term in months or years?",

                        answer:
                            "Yes. Select Years or Months from the Loan Term Type field. If you enter years, the calculator converts the term into months before calculating the repayment."

                    },

                    {

                        question:
                            "Can this calculator handle a 0% interest loan?",

                        answer:
                            "Yes. For a zero-interest loan, the borrowed amount is divided evenly across the repayment period, so the total interest is zero and the total repayment equals the original loan amount."

                    },

                    {

                        question:
                            "Can I use this calculator for personal, auto, or home loans?",

                        answer:
                            "Yes. It can be used to estimate payments for many fixed-rate installment loan scenarios, including personal loans, auto loans, and home loans, provided the loan follows the assumptions used by the calculator."

                    },

                    {

                        question:
                            "Does the calculator include fees, taxes, insurance, or other charges?",

                        answer:
                            "No. The current calculation is based on the loan amount, entered interest rate, and repayment term. Origination fees, taxes, insurance, penalties, and other lender-specific charges are not automatically included."

                    },

                    {

                        question:
                            "Are the Loan Calculator results exact?",

                        answer:
                            "The results are estimates based on the values you enter and the calculator's repayment formula. Actual lender payments and total borrowing costs may differ because of fees, rate structures, payment schedules, rounding methods, insurance, taxes, and other loan terms."

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "LoanCalculator",

        LoanCalculatorSchema

    );


    console.info(
        "✓ Loan Calculator schema registered."
    );


})();