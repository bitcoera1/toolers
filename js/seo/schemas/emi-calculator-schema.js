/*!
 * ==========================================================
 * ToolXone EMI Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the EMI Calculator.
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

    const EMICalculatorSchema =
        Object.freeze({

            version: "1.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "EMI Calculator - Calculate Monthly Loan EMI & Interest | ToolXone",

                    description:
                        "Use ToolXone's free EMI Calculator to calculate monthly loan EMI, total interest and repayment amount for home, car, personal and other installment loans."

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/emi-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone EMI Calculator"

                },


                mobile: {

                    appleTitle:
                        "EMI Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "EMI Calculator - Calculate Monthly Loan EMI & Interest | ToolXone",

                    description:
                        "Calculate monthly loan EMI, total interest and repayment amount with ToolXone's free online EMI Calculator.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/emi-calculator.html",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageWidth:
                        797,

                    imageHeight:
                        335,

                    imageAlt:
                        "ToolXone EMI Calculator",

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
                        "EMI Calculator - Calculate Monthly Loan EMI & Interest | ToolXone",

                    description:
                        "Calculate monthly loan EMI, total interest and repayment amount with ToolXone's free online EMI Calculator.",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageAlt:
                        "ToolXone EMI Calculator"

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
                        "EMI Calculator",

                    url:
                        "https://www.toolxone.com/emi-calculator.html",

                    description:
                        "Calculate monthly EMI, total interest and total repayment and understand how loan amount, interest rate and repayment tenure affect installment payments."

                },


                application: {

                    name:
                        "ToolXone EMI Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "EMI Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/emi-calculator.html",

                    description:
                        "Free online EMI calculator for estimating monthly loan installments, total interest and total repayment for standard installment loans.",

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
                            "EMI Calculator",

                        url:
                            "https://www.toolxone.com/emi-calculator.html"

                    }

                ],


                faq: [

                    {

                        question:
                            "What is EMI?",

                        answer:
                            "EMI stands for Equated Monthly Installment. It is a regular monthly payment used to repay a loan over a specified period. For an interest-bearing loan, the EMI includes repayment of both principal and interest."

                    },

                    {

                        question:
                            "How is EMI calculated?",

                        answer:
                            "For a standard reducing-balance loan, EMI is calculated using the principal loan amount, monthly interest rate, and total number of monthly installments. The calculator converts the annual interest rate into a monthly rate and the loan tenure into months before calculating the EMI."

                    },

                    {

                        question:
                            "What happens if the interest rate is 0%?",

                        answer:
                            "For a 0% interest loan, no interest is charged. The monthly payment is calculated by dividing the loan amount by the total number of months, so the total repayment equals the original loan amount."

                    },

                    {

                        question:
                            "Can I enter a loan tenure shorter than one year?",

                        answer:
                            "Yes. You can enter a fractional year when it represents a whole number of months. For example, 0.5 years represents 6 months and 0.25 years represents 3 months."

                    },

                    {

                        question:
                            "Does a longer loan tenure reduce the EMI?",

                        answer:
                            "Generally, a longer loan tenure lowers the monthly EMI because repayment is spread across more installments. However, for an interest-bearing loan, a longer tenure can increase the total interest paid over the life of the loan."

                    },

                    {

                        question:
                            "Can I use this EMI calculator for car, personal, or home loans?",

                        answer:
                            "Yes. The calculator can estimate payments for many fixed-payment installment loans, including car loans, personal loans, home loans, and similar loans, provided the loan follows the standard EMI calculation model."

                    },

                    {

                        question:
                            "What do principal and interest mean?",

                        answer:
                            "Principal is the original amount borrowed. Interest is the additional amount charged for borrowing that money. The calculator shows their contribution to the estimated total repayment."

                    },

                    {

                        question:
                            "What is total interest?",

                        answer:
                            "Total interest is the estimated amount paid above the original principal over the full loan tenure. It is calculated as the total of all EMI payments minus the original loan amount."

                    },

                    {

                        question:
                            "What is total payment?",

                        answer:
                            "Total payment is the estimated amount repaid over the entire loan tenure. It includes the original principal plus the total interest."

                    },

                    {

                        question:
                            "Are the EMI Calculator results exact lender quotes?",

                        answer:
                            "No. The results are estimates based on the values you enter. Actual lender payments may differ because of fees, taxes, insurance, rounding methods, payment schedules, variable rates, or other loan terms."

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "EMICalculator",

        EMICalculatorSchema

    );


    console.info(
        "✓ EMI Calculator schema registered."
    );


})();