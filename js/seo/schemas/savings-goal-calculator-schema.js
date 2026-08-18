/*!
 * ==========================================================
 * ToolXone Savings Goal Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Savings Goal Calculator.
 *
 * Version : 2.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

    "use strict";


    /* ==========================================================
       PAGE SCHEMA
    ========================================================== */

    const SavingsGoalCalculatorSchema =
        Object.freeze({

            version:
                "2.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "Savings Goal Calculator - Calculate Monthly Savings Needed | ToolXone",

                    description:
                        "Use ToolXone's free Savings Goal Calculator to estimate how much you need to save each month to reach a target amount based on your current savings and available time.",

                    keywords: [

                        "savings goal calculator",

                        "savings goal calculator online",

                        "free savings goal calculator",

                        "savings goal calculator free",

                        "monthly savings calculator",

                        "monthly savings goal calculator",

                        "calculate monthly savings",

                        "savings target calculator",

                        "savings calculator",

                        "saving goal calculator",

                        "goal savings calculator",

                        "financial goal calculator",

                        "savings planner",

                        "savings target planner",

                        "monthly saving needed calculator",

                        "calculate savings needed",

                        "emergency fund calculator",

                        "vacation savings calculator",

                        "future savings goal calculator",

                        "ToolXone"

                    ]

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/savings-goal-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone Savings Goal Calculator"

                },


                mobile: {

                    appleTitle:
                        "Savings Goal Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "Savings Goal Calculator - Calculate Monthly Savings Needed | ToolXone",

                    description:
                        "Calculate how much you need to save each month to reach your savings goal with ToolXone's free online Savings Goal Calculator.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/savings-goal-calculator.html",

                    image:
                        "https://www.toolxone.com/images/savings-goal-calculator.webp",

                    imageWidth:
                        1536,

                    imageHeight:
                        1024,

                    imageAlt:
                        "ToolXone Savings Goal Calculator for calculating monthly savings needed to reach a financial goal",

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
                        "Savings Goal Calculator - Calculate Monthly Savings Needed | ToolXone",

                    description:
                        "Calculate the monthly savings needed to reach your financial goal with ToolXone's free Savings Goal Calculator.",

                    image:
                        "https://www.toolxone.com/images/savings-goal-calculator.webp",

                    imageAlt:
                        "ToolXone Savings Goal Calculator"

                }

            },


            /* ======================================================
               STRUCTURED DATA
            ====================================================== */

            schema: {

                /* --------------------------------------------------
                   ORGANIZATION
                -------------------------------------------------- */

                organization: {

                    name:
                        "ToolXone",

                    url:
                        "https://www.toolxone.com/"

                },


                /* --------------------------------------------------
                   WEBSITE
                -------------------------------------------------- */

                website: {

                    name:
                        "ToolXone",

                    url:
                        "https://www.toolxone.com/"

                },


                /* --------------------------------------------------
                   WEBPAGE
                -------------------------------------------------- */

                webpage: {

                    name:
                        "Savings Goal Calculator",

                    url:
                        "https://www.toolxone.com/savings-goal-calculator.html",

                    description:
                        "Free online savings goal calculator for estimating the monthly savings needed to reach a target amount within a specified time period."

                },


                /* --------------------------------------------------
                   APPLICATION
                -------------------------------------------------- */

                application: {

                    name:
                        "ToolXone Savings Goal Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "Savings Goal Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/savings-goal-calculator.html",

                    description:
                        "Free online savings goal calculator for estimating the monthly amount needed to reach a financial target based on current savings and available time.",

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


                /* --------------------------------------------------
                   BREADCRUMBS
                -------------------------------------------------- */

                breadcrumbs: [

                    {

                        name:
                            "Home",

                        url:
                            "https://www.toolxone.com/"

                    },

                    {

                        name:
                            "Savings Goal Calculator",

                        url:
                            "https://www.toolxone.com/savings-goal-calculator.html"

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "SavingsGoalCalculator",

        SavingsGoalCalculatorSchema

    );


    console.info(

        "✓ Savings Goal Calculator schema registered."

    );


})();