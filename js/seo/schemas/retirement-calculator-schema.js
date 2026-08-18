/*!
 * ==========================================================
 * ToolXone Retirement Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Retirement Calculator.
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

    const RetirementCalculatorSchema =
        Object.freeze({

            version:
                "2.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "Retirement Calculator - Calculate Future Retirement Savings | ToolXone",

                    description:
                        "Use ToolXone's free Retirement Calculator to estimate future retirement savings and investment growth based on your age, current savings, monthly contributions and expected return.",

                    keywords: [

                        "retirement calculator",

                        "retirement calculator online",

                        "free retirement calculator",

                        "retirement calculator free",

                        "retirement planning calculator",

                        "retirement savings calculator",

                        "retirement savings calculator online",

                        "future retirement savings calculator",

                        "calculate retirement savings",

                        "retirement investment calculator",

                        "retirement investment growth calculator",

                        "retirement fund calculator",

                        "retirement planning tool",

                        "retirement age calculator",

                        "monthly contribution retirement calculator",

                        "retirement corpus calculator",

                        "future savings calculator",

                        "retirement estimate calculator",

                        "retirement investment growth",

                        "ToolXone"

                    ]

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/retirement-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone Retirement Calculator"

                },


                mobile: {

                    appleTitle:
                        "Retirement Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "Retirement Calculator - Calculate Future Retirement Savings | ToolXone",

                    description:
                        "Estimate your future retirement savings and investment growth with ToolXone's free online Retirement Calculator.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/retirement-calculator.html",

                    image:
                        "https://www.toolxone.com/images/retirement-calculator.webp",

                    imageWidth:
                        1536,

                    imageHeight:
                        1024,

                    imageAlt:
                        "ToolXone Retirement Calculator for estimating future retirement savings and investment growth",

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
                        "Retirement Calculator - Calculate Future Retirement Savings | ToolXone",

                    description:
                        "Estimate future retirement savings and investment growth with ToolXone's free online Retirement Calculator.",

                    image:
                        "https://www.toolxone.com/images/retirement-calculator.webp",

                    imageAlt:
                        "ToolXone Retirement Calculator"

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
                        "Retirement Calculator",

                    url:
                        "https://www.toolxone.com/retirement-calculator.html",

                    description:
                        "Free online retirement calculator for estimating future retirement savings and investment growth based on age, current savings, monthly contributions and expected annual return."

                },


                /* --------------------------------------------------
                   APPLICATION
                -------------------------------------------------- */

                application: {

                    name:
                        "ToolXone Retirement Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "Retirement Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/retirement-calculator.html",

                    description:
                        "Free online retirement calculator for estimating future retirement savings and investment growth based on current age, planned retirement age, current savings, monthly contributions and expected annual return.",

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
                            "Retirement Calculator",

                        url:
                            "https://www.toolxone.com/retirement-calculator.html"

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "RetirementCalculator",

        RetirementCalculatorSchema

    );


    console.info(

        "✓ Retirement Calculator schema registered."

    );


})();