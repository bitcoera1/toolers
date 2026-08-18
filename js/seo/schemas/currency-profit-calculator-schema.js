/*!
 * ==========================================================
 * ToolXone Currency Profit Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Currency Profit Calculator.
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

    const CurrencyProfitCalculatorSchema =
        Object.freeze({

            version:
                "2.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "Currency Profit Calculator - Calculate Exchange Profit & Loss | ToolXone",

                    description:
                        "Use ToolXone's free Currency Profit Calculator to calculate currency exchange profit, loss, fees and percentage gain or loss.",

                    keywords: [

                        "currency profit calculator",

                        "currency exchange profit calculator",

                        "currency profit calculator online",

                        "free currency profit calculator",

                        "currency profit calculator free",

                        "currency exchange profit calculator online",

                        "calculate currency profit",

                        "currency exchange profit and loss calculator",

                        "currency exchange profit calculator",

                        "currency gain calculator",

                        "currency loss calculator",

                        "forex profit calculator",

                        "exchange rate profit calculator",

                        "currency exchange gain calculator",

                        "currency trading profit calculator",

                        "currency exchange loss calculator",

                        "calculate exchange profit",

                        "currency profit and loss calculator",

                        "currency conversion profit calculator",

                        "ToolXone"

                    ]

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/currency-profit-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone Currency Profit Calculator"

                },


                mobile: {

                    appleTitle:
                        "Currency Profit Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "Currency Profit Calculator - Calculate Exchange Profit & Loss | ToolXone",

                    description:
                        "Calculate currency exchange profit, loss, fees and percentage gain or loss with ToolXone's free online Currency Profit Calculator.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/currency-profit-calculator.html",

                    image:
                        "https://www.toolxone.com/images/currency-profit-calculator.webp",

                    imageWidth:
                        1024,

                    imageHeight:
                        1024,

                    imageAlt:
                        "ToolXone Currency Profit Calculator for calculating currency exchange profit, loss, fees and percentage gain or loss",

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
                        "Currency Profit Calculator - Calculate Exchange Profit & Loss | ToolXone",

                    description:
                        "Calculate currency exchange profit, loss, fees and percentage gain or loss with ToolXone's free Currency Profit Calculator.",

                    image:
                        "https://www.toolxone.com/images/currency-profit-calculator.webp",

                    imageAlt:
                        "ToolXone Currency Profit Calculator"

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
                        "Currency Profit Calculator",

                    url:
                        "https://www.toolxone.com/currency-profit-calculator.html",

                    description:
                        "Free online currency profit calculator for calculating currency exchange profit, loss, fees and percentage gain or loss."

                },


                /* --------------------------------------------------
                   APPLICATION
                -------------------------------------------------- */

                application: {

                    name:
                        "ToolXone Currency Profit Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "Currency Profit Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/currency-profit-calculator.html",

                    description:
                        "Free online currency profit calculator for calculating exchange profit or loss using currency amount, buy rate, sell rate and exchange fees.",

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
                            "Currency Profit Calculator",

                        url:
                            "https://www.toolxone.com/currency-profit-calculator.html"

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "CurrencyProfitCalculator",

        CurrencyProfitCalculatorSchema

    );


    console.info(

        "✓ Currency Profit Calculator schema registered."

    );


})();