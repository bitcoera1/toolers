/*!
 * ==========================================================
 * ToolXone Compound Interest Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Compound Interest Calculator.
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

    const CompoundInterestCalculatorSchema =
        Object.freeze({

            version: "1.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "Compound Interest Calculator - Calculate Investment Growth | ToolXone",

                    description:
                        "Use ToolXone's free Compound Interest Calculator to estimate future value, total contributions, interest earned and investment growth with regular contributions and different compounding frequencies."

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/compound-interest-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone Compound Interest Calculator"

                },


                mobile: {

                    appleTitle:
                        "Compound Interest Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "Compound Interest Calculator - Calculate Investment Growth | ToolXone",

                    description:
                        "Calculate future value, total contributions, interest earned and investment growth with ToolXone's free online Compound Interest Calculator.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/compound-interest-calculator.html",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageWidth:
                        797,

                    imageHeight:
                        335,

                    imageAlt:
                        "ToolXone Compound Interest Calculator",

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
                        "Compound Interest Calculator - Calculate Investment Growth | ToolXone",

                    description:
                        "Calculate future value, total contributions, interest earned and investment growth with ToolXone's free online Compound Interest Calculator.",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageAlt:
                        "ToolXone Compound Interest Calculator"

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
                        "Compound Interest Calculator",

                    url:
                        "https://www.toolxone.com/compound-interest-calculator.html",

                    description:
                        "Calculate future investment value, total contributions, interest earned and growth while exploring how compounding frequency, regular contributions and investment time affect results."

                },


                application: {

                    name:
                        "ToolXone Compound Interest Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "Compound Interest Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/compound-interest-calculator.html",

                    description:
                        "Free online compound interest calculator for estimating future value, total contributions, interest earned and investment growth with different compounding frequencies.",

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
                            "Compound Interest Calculator",

                        url:
                            "https://www.toolxone.com/compound-interest-calculator.html"

                    }

                ],


                faq: [

                    {

                        question:
                            "What is compound interest?",

                        answer:
                            "Compound interest is interest calculated on both the original amount and previously accumulated interest. Over time, this can allow an investment or balance to grow faster than simple interest when interest is regularly added to the principal."

                    },

                    {

                        question:
                            "How does compound interest differ from simple interest?",

                        answer:
                            "Simple interest is calculated only on the original principal, while compound interest can be calculated on the principal plus previously accumulated interest. This difference can become more significant over longer periods."

                    },

                    {

                        question:
                            "How do regular monthly contributions affect compound growth?",

                        answer:
                            "Regular contributions increase the amount invested over time and can provide additional capital for future growth. The effect depends on the contribution amount, investment period, interest rate and compounding frequency."

                    },

                    {

                        question:
                            "Does compounding frequency affect investment growth?",

                        answer:
                            "Yes. Compounding frequency determines how often interest is added to the balance. Depending on the rate and other assumptions, more frequent compounding can produce a different future value than less frequent compounding."

                    },

                    {

                        question:
                            "What happens if I invest for a longer period?",

                        answer:
                            "A longer investment period gives compound growth more time to accumulate. When returns are reinvested, the effect of compounding can become increasingly significant over longer periods."

                    },

                    {

                        question:
                            "What is the difference between total contributions and interest earned?",

                        answer:
                            "Total contributions represent the original investment plus any regular contributions made during the investment period. Interest earned is the estimated growth above those contributions."

                    },

                    {

                        question:
                            "Can inflation reduce the real value of investment growth?",

                        answer:
                            "Yes. Inflation can reduce the purchasing power of money over time. A nominal investment return may therefore represent a smaller increase in real purchasing power after accounting for inflation."

                    },

                    {

                        question:
                            "Are Compound Interest Calculator results guaranteed?",

                        answer:
                            "No. The calculator provides estimates based on the values and assumptions entered. Actual investment returns may vary because of market performance, fees, taxes, changing rates, contribution timing and other factors."

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "CompoundInterestCalculator",

        CompoundInterestCalculatorSchema

    );


    console.info(

        "✓ Compound Interest Calculator schema registered."

    );


})();