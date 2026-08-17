/* ==========================================================
   TOOLXONE PROFIT MARGIN CALCULATOR SCHEMA
   ----------------------------------------------------------
   Structured Data + SEO Metadata
========================================================== */

(function () {

    "use strict";


    /* ======================================================
       PAGE SCHEMA
    ====================================================== */

    const ProfitMarginCalculatorSchema = {

        /* ==================================================
           SEO METADATA
        ================================================== */

        meta: {

            title:
                "Profit Margin Calculator – Free Online Margin & Markup Tool | ToolXone",

            description:
                "Use ToolXone's free Profit Margin Calculator to calculate profit or loss, profit margin and markup from cost price and selling price. Fast and easy for pricing decisions.",

            keywords:
                "profit margin calculator, profit calculator, markup calculator, profit margin, profit or loss calculator, selling price calculator",

            robots:
                "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",

            author:
                "ToolXone",

            canonical:
                "https://www.toolxone.com/profit-margin-calculator.html",

            themeColor:
                "#0f172a",

            openGraph: {

                type:
                    "website",

                siteName:
                    "ToolXone",

                title:
                    "Profit Margin Calculator – Free Online Margin & Markup Tool | ToolXone",

                description:
                    "Calculate profit or loss, profit margin and markup from cost price and selling price with ToolXone's free online calculator.",

                url:
                    "https://www.toolxone.com/profit-margin-calculator.html",

                image:
                    "https://www.toolxone.com/images/toolxone-logo.jpg",

                imageAlt:
                    "ToolXone Profit Margin Calculator",

                locale:
                    "en_US"
            },

            twitter: {

                card:
                    "summary_large_image",

                site:
                    "@ToolXone",

                title:
                    "Profit Margin Calculator – Free Online Margin & Markup Tool | ToolXone",

                description:
                    "Calculate profit or loss, profit margin and markup from cost price and selling price with ToolXone.",

                image:
                    "https://www.toolxone.com/images/toolxone-logo.jpg",

                imageAlt:
                    "ToolXone Profit Margin Calculator"
            }
        },


        /* ==================================================
           STRUCTURED DATA
        ================================================== */

        schema: {

            /* ==============================================
               ORGANIZATION
            ============================================== */

            organization: {

                name:
                    "ToolXone",

                url:
                    "https://www.toolxone.com",

                logo:
                    "https://www.toolxone.com/images/toolxone-logo.jpg"
            },


            /* ==============================================
               WEBSITE
            ============================================== */

            website: {

                name:
                    "ToolXone",

                url:
                    "https://www.toolxone.com",

                description:
                    "ToolXone provides free online calculators, converters and useful digital tools.",

                inLanguage:
                    "en",

                publisher: {
                    "@id":
                        "https://www.toolxone.com/#organization"
                }
            },


            /* ==============================================
               WEBPAGE
            ============================================== */

            webpage: {

                name:
                    "Profit Margin Calculator",

                url:
                    "https://www.toolxone.com/profit-margin-calculator.html",

                description:
                    "Free online Profit Margin Calculator for calculating profit or loss, profit margin and markup from cost price and selling price.",

                inLanguage:
                    "en",

                isPartOf: {
                    "@id":
                        "https://www.toolxone.com/#website"
                },

                mainEntity: {
                    "@id":
                        "https://www.toolxone.com/profit-margin-calculator.html#application"
                }
            },


            /* ==============================================
               SOFTWARE APPLICATION
            ============================================== */

            application: {

                "@id":
                    "https://www.toolxone.com/profit-margin-calculator.html#application",

                name:
                    "Profit Margin Calculator",

                url:
                    "https://www.toolxone.com/profit-margin-calculator.html",

                description:
                    "Free online profit margin calculator for calculating profit or loss, profit margin and markup from cost price and selling price.",

                applicationCategory:
                    "FinanceApplication",

                operatingSystem:
                    "Any",

                isAccessibleForFree:
                    true,

                offers: {

                    "@type":
                        "Offer",

                    price:
                        "0",

                    priceCurrency:
                        "USD"
                },

                publisher: {
                    "@id":
                        "https://www.toolxone.com/#organization"
                }
            },


            /* ==============================================
               BREADCRUMBS
            ============================================== */

            breadcrumbs: [

                {
                    name:
                        "Home",

                    url:
                        "https://www.toolxone.com/"
                },

                {
                    name:
                        "Finance",

                    url:
                        "https://www.toolxone.com/"
                },

                {
                    name:
                        "Profit Margin Calculator",

                    url:
                        "https://www.toolxone.com/profit-margin-calculator.html"
                }
            ],


            /* ==============================================
               FAQ
            ============================================== */

            faq: [

                {
                    question:
                        "What is profit margin?",

                    answer:
                        "Profit margin shows what percentage of the selling price remains as profit after subtracting the entered cost price. It is calculated by dividing profit by selling price and multiplying by 100."
                },

                {
                    question:
                        "How does this Profit Margin Calculator work?",

                    answer:
                        "Enter the cost price and selling price. The calculator subtracts cost from selling price to determine profit or loss, then calculates profit margin as a percentage of selling price and markup as a percentage of cost."
                },

                {
                    question:
                        "What is the difference between profit margin and markup?",

                    answer:
                        "Profit margin measures profit as a percentage of the selling price, while markup measures profit as a percentage of the cost price. Because they use different bases, the margin percentage and markup percentage are usually different."
                },

                {
                    question:
                        "How is profit calculated?",

                    answer:
                        "Profit is calculated by subtracting cost price from selling price. If the selling price is greater than the cost price, the result is a profit. If the selling price is lower than the cost price, the result is a loss."
                },

                {
                    question:
                        "How is profit margin calculated?",

                    answer:
                        "Profit margin is calculated as profit divided by selling price, multiplied by 100. For example, if an item costs 80 and sells for 100, the profit is 20 and the profit margin is 20%."
                },

                {
                    question:
                        "How is markup calculated?",

                    answer:
                        "Markup is calculated as profit divided by cost price, multiplied by 100. If an item costs 80 and sells for 100, the profit is 20 and the markup is 25%."
                },

                {
                    question:
                        "Can this calculator show a loss?",

                    answer:
                        "Yes. If the selling price is lower than the cost price, the calculator displays a loss and the resulting profit margin and markup can be negative."
                },

                {
                    question:
                        "Is this Profit Margin Calculator free to use?",

                    answer:
                        "Yes. ToolXone's Profit Margin Calculator is free to use online for calculating profit or loss, profit margin and markup from cost and selling prices."
                }
            ]
        }
    };


    /* ======================================================
       REGISTER PAGE
    ====================================================== */

    ToolXoneSchemaRegistry.register(
        "ProfitMarginCalculator",
        ProfitMarginCalculatorSchema
    );


    console.info(
        "✓ Profit Margin Calculator schema registered."
    );


})();