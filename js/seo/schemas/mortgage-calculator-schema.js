/*
==========================================================
ToolXone Mortgage Calculator Schema
----------------------------------------------------------
SEO metadata + structured data for:
Mortgage Calculator
==========================================================
*/

(function () {

    const MortgageCalculatorSchema = {

        /* ======================================================
           META
        ====================================================== */

        meta: {

            title:
                "Mortgage Calculator - Monthly Payment & Interest | ToolXone",

            description:
                "Use ToolXone's free Mortgage Calculator to estimate monthly mortgage payments, total interest and total repayment based on loan amount, interest rate and term.",

            canonical:
                "https://www.toolxone.com/mortgage-calculator.html",

            robots:
                "index,follow",

            author:
                "ToolXone",

            openGraph: {

                title:
                    "Mortgage Calculator - Monthly Payment & Interest | ToolXone",

                description:
                    "Estimate monthly mortgage payments, total interest and total repayment using ToolXone's free Mortgage Calculator.",

                type:
                    "website",

                url:
                    "https://www.toolxone.com/mortgage-calculator.html",

                image:
                    "https://www.toolxone.com/images/toolxone-logo.jpg",

                imageAlt:
                    "ToolXone Mortgage Calculator",

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
                    "Mortgage Calculator - Monthly Payment & Interest | ToolXone",

                description:
                    "Estimate monthly mortgage payments, total interest and total repayment with ToolXone's free online Mortgage Calculator.",

                image:
                    "https://www.toolxone.com/images/toolxone-logo.jpg",

                imageAlt:
                    "ToolXone Mortgage Calculator"
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
                    "https://www.toolxone.com"
            },


            website: {

                name:
                    "ToolXone",

                url:
                    "https://www.toolxone.com"
            },


            webpage: {

                name:
                    "Mortgage Calculator",

                url:
                    "https://www.toolxone.com/mortgage-calculator.html",

                description:
                    "Free online mortgage calculator to estimate monthly principal and interest payments, total interest, total repayment and number of payments based on loan amount, annual interest rate and loan term."
            },


application: {

    name:
        "ToolXone Mortgage Calculator",

    applicationCategory:
        "FinanceApplication",

    applicationSubCategory:
        "Mortgage Calculator",

    operatingSystem:
        "Any",

    isAccessibleForFree:
        true,

    offers: {

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
                        "Mortgage Calculator",

                    url:
                        "https://www.toolxone.com/mortgage-calculator.html"
                }

            ],


            /* ==================================================
               FAQ STRUCTURED DATA
            ================================================== */

            faq: [

                {
                    question:
                        "What does this mortgage calculator estimate?",

                    answer:
                        "This mortgage calculator estimates your monthly principal and interest payment, total interest paid, total repayment amount, and number of monthly payments based on the loan amount, annual interest rate, and loan term you enter."
                },


                {
                    question:
                        "How does the mortgage calculator work?",

                    answer:
                        "The calculator uses the loan amount, annual interest rate, and loan term to estimate the fixed monthly principal and interest payment. It then calculates the total amount paid over the loan term and the portion of that total represented by interest."
                },


                {
                    question:
                        "How can I use this calculator when comparing home loans?",

                    answer:
                        "Try different loan amounts, interest rates, and loan terms to compare possible mortgage scenarios. This can help you see how a lower interest rate, smaller loan amount, or different repayment period may affect your monthly payment and total interest cost."
                },


                {
                    question:
                        "How does the interest rate affect a mortgage?",

                    answer:
                        "For the same loan amount and term, a higher interest rate generally increases both the monthly payment and the total interest paid over the life of the mortgage. A lower rate generally reduces these costs."
                },


                {
                    question:
                        "How does the loan term affect mortgage payments?",

                    answer:
                        "A longer loan term generally reduces the monthly payment because repayment is spread across more months, but it can increase the total interest paid over the life of the loan. A shorter term generally requires higher monthly payments but may reduce total interest."
                },


                {
                    question:
                        "Does this mortgage calculator include property taxes, insurance, PMI, or HOA fees?",

                    answer:
                        "No. This calculator estimates principal and interest based on the loan information you enter. It does not automatically include property taxes, homeowners insurance, private mortgage insurance, homeowners association fees, closing costs, or other expenses that may affect the actual cost of owning a home."
                },


                {
                    question:
                        "Can I calculate a mortgage with a 0% interest rate?",

                    answer:
                        "Yes. If you enter a 0% annual interest rate, the calculator divides the loan amount by the total number of monthly payments to estimate the monthly payment without interest."
                },


                {
                    question:
                        "Can the mortgage term include half years?",

                    answer:
                        "Yes, when the entered term converts to a whole number of months. For example, 30.5 years equals 366 months and can be calculated. A term that produces a fractional number of months is rejected because mortgage payments are calculated in whole monthly periods."
                },


                {
                    question:
                        "Are the mortgage results exact?",

                    answer:
                        "The results are estimates based on the values you enter and the calculator's fixed-payment formula. Actual mortgage payments and costs may differ because of lender terms, fees, taxes, insurance, payment timing, rounding, and other factors."
                },


                {
                    question:
                        "Is this mortgage calculator free to use?",

                    answer:
                        "Yes. ToolXone's Mortgage Calculator is free to use online and can be used to explore and compare different home loan scenarios."
                }

            ]

        }

    };


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(
        "MortgageCalculator",
        MortgageCalculatorSchema
    );


    console.info(
        "✓ Mortgage Calculator schema registered."
    );


})();