/*!
 * ==========================================================
 * ToolXone Percentage Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Percentage Calculator.
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

const PercentageCalculatorSchema =
Object.freeze({

    version: "1.0.0",

    /* ======================================================
       META
    ====================================================== */

    meta: {

        basic: {

            title:
                "Percentage Calculator – Free Online Percentage Calculator | ToolXone",

            description:
                "Use ToolXone's free Percentage Calculator to calculate percentages, find percentage values, and calculate percentage increase or decrease quickly and accurately.",

            keywords: [

                "percentage calculator",

                "percentage calculator online",

                "free percentage calculator",

                "calculate percentage",

                "percentage increase calculator",

                "percentage decrease calculator",

                "percent calculator",

                "percentage change calculator",

                "what percent is",

                "percentage of a number",

                "ToolXone"

            ]

        },

        canonical: {

            href:
                "https://www.toolxone.com/percentage-calculator.html"

        },

        robots: {

            content:
                "index,follow"

        },

        application: {

            name:
                "ToolXone Percentage Calculator"

        },

        mobile: {

            appleTitle:
                "Percentage Calculator",

            themeColor:
                "#0f172a"

        },

        openGraph: {

            title:
                "Percentage Calculator – Free Online Percentage Calculator | ToolXone",

            description:
                "Calculate percentages, percentage values, percentage increase and percentage decrease with ToolXone's free online Percentage Calculator.",

            type:
                "website",

            url:
                "https://www.toolxone.com/percentage-calculator.html",

            image:
                "https://www.toolxone.com/images/toolxone-logo.jpg",

            imageWidth:
                797,

            imageHeight:
                335,

            imageAlt:
                "ToolXone Percentage Calculator - Free Online Calculator",

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
                "Percentage Calculator - Free Online Calculator | ToolXone",

            description:
                "Calculate percentages, percentage values, percentage increase and percentage decrease with ToolXone's free Percentage Calculator.",

            image:
                "https://www.toolxone.com/images/toolxone-logo.jpg",

            imageAlt:
                "ToolXone Percentage Calculator - Free Online Calculator"

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
                "Percentage Calculator",

            url:
                "https://www.toolxone.com/percentage-calculator.html",

            description:
                "Free online percentage calculator for calculating percentage values, percentage of a number, and percentage increase or decrease."

        },

        application: {

            name:
                "ToolXone Percentage Calculator",

            applicationCategory:
                "CalculatorApplication"

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
                    "Percentage Calculator",

                url:
                    "https://www.toolxone.com/percentage-calculator.html"

            }

        ],

        faq: [

            {

                question:
                    "What is a percentage calculator?",

                answer:
                    "A percentage calculator helps calculate percentages, percentage values, and percentage changes quickly and accurately."

            },

            {

                question:
                    "How do I calculate a percentage of a number?",

                answer:
                    "To calculate a percentage of a number, multiply the number by the percentage and divide by 100. For example, 20% of 500 is 100."

            },

            {

                question:
                    "How do I calculate percentage increase or decrease?",

                answer:
                    "Subtract the old value from the new value, divide the difference by the old value, and multiply by 100 to calculate the percentage change."

            },

            {

                question:
                    "Is ToolXone Percentage Calculator free?",

                answer:
                    "Yes. ToolXone Percentage Calculator is completely free to use on desktop, tablet and mobile devices."

            }

        ]

    }

});


/* ==========================================================
   REGISTER PAGE
========================================================== */

ToolXoneSchemaRegistry.register(

    "PercentageCalculator",

    PercentageCalculatorSchema

);


console.info(
    "✓ Percentage Calculator schema registered."
);


})();