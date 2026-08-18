/*!
 * ==========================================================
 * ToolXone Inflation Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Inflation Calculator.
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

    const InflationCalculatorSchema =
        Object.freeze({

            version:
                "2.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "Inflation Calculator - Calculate Future Value & Purchasing Power | ToolXone",

                    description:
                        "Use ToolXone's free Inflation Calculator to estimate future value, inflation increase and purchasing power over time.",

                    keywords: [

                        "inflation calculator",

                        "inflation calculator online",

                        "free inflation calculator",

                        "inflation calculator free",

                        "calculate inflation",

                        "inflation rate calculator",

                        "future value inflation calculator",

                        "purchasing power calculator",

                        "future purchasing power calculator",

                        "inflation increase calculator",

                        "inflation calculator by year",

                        "money inflation calculator",

                        "price inflation calculator",

                        "inflation impact calculator",

                        "calculate future value",

                        "future value calculator",

                        "inflation calculator for money",

                        "ToolXone"

                    ]

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/inflation-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone Inflation Calculator"

                },


                mobile: {

                    appleTitle:
                        "Inflation Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "Inflation Calculator - Calculate Future Value & Purchasing Power | ToolXone",

                    description:
                        "Calculate future value, inflation increase and purchasing power with ToolXone's free online Inflation Calculator.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/inflation-calculator.html",

                    image:
                        "https://www.toolxone.com/images/inflation-calculator.webp",

                    imageWidth:
                        1024,

                    imageHeight:
                        1024,

                    imageAlt:
                        "ToolXone Inflation Calculator for estimating future value, inflation increase and purchasing power",

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
                        "Inflation Calculator - Calculate Future Value & Purchasing Power | ToolXone",

                    description:
                        "Calculate future value, inflation increase and purchasing power with ToolXone's free Inflation Calculator.",

                    image:
                        "https://www.toolxone.com/images/inflation-calculator.webp",

                    imageAlt:
                        "ToolXone Inflation Calculator"

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
                        "Inflation Calculator",

                    url:
                        "https://www.toolxone.com/inflation-calculator.html",

                    description:
                        "Free online inflation calculator for estimating future value, inflation increase and purchasing power over time."

                },


                /* --------------------------------------------------
                   APPLICATION
                -------------------------------------------------- */

                application: {

                    name:
                        "ToolXone Inflation Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "Inflation Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/inflation-calculator.html",

                    description:
                        "Free online inflation calculator for estimating future value, inflation increase and purchasing power using an inflation rate and time period.",

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
                            "Inflation Calculator",

                        url:
                            "https://www.toolxone.com/inflation-calculator.html"

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "InflationCalculator",

        InflationCalculatorSchema

    );


    console.info(

        "✓ Inflation Calculator schema registered."

    );


})();