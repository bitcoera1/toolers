/*!
 * ==========================================================
 * ToolXone Scientific Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Scientific Calculator.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";

const ScientificCalculatorSchema = 
Object.freeze({

version:"1.0.0",

    meta: {

    basic: {

        title:
            "Scientific Calculator – Free Online Scientific Calculator with Advanced Math Functions | ToolXone",

        description:
            "Use ToolXone's free Scientific Calculator to solve trigonometry, logarithms, exponents, roots, percentages, factorials, scientific notation and advanced math calculations instantly. Fast, accurate, mobile-friendly and completely free.",

        keywords: [

            "scientific calculator",

            "online scientific calculator",

            "free scientific calculator",

            "advanced calculator",

            "math calculator",

            "trigonometry calculator",

            "log calculator",

            "ln calculator",

            "square root calculator",

            "cube root calculator",

            "factorial calculator",

            "scientific notation calculator",

            "ToolXone"

        ]

    },

      canonical: {

        href:
            "https://www.toolxone.com/scientific-calculator.html"

    },

    robots: {

        content:
            "index,follow"

    },

    application: {

        name:
            "ToolXone Scientific Calculator"

    },

    mobile: {

        appleTitle:
            "Scientific Calculator",

        themeColor:
            "#0f172a"

    },

    openGraph: {

        title:
            "Scientific Calculator – Free Online Scientific Calculator | ToolXone",

        description:
            "Free online Scientific Calculator with trigonometry, logarithms, powers, roots, scientific notation, constants, memory functions and advanced mathematical calculations.",

        type:
            "website",

        url:
            "https://www.toolxone.com/scientific-calculator.html",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageWidth:
            797,

        imageHeight:
            335,

        imageAlt:
            "ToolXone Scientific Calculator - Free Online Calculator",

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
            "Scientific Calculator - Free Online Calculator | ToolXone",

        description:
            "Perform advanced mathematical calculations with ToolXone's free Scientific Calculator. Supports trigonometry, logarithms, roots, powers, percentages and much more.",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageAlt:
            "ToolXone Scientific Calculator - Free Online Calculator"

    }

},

    schema: {

        organization: {

            name: "ToolXone",

            url: "https://www.toolxone.com"

        },

        website: {

            name: "ToolXone",

            url: "https://www.toolxone.com"

        },

        webpage: {

            name:
                "Scientific Calculator",

            url:
                "https://www.toolxone.com/scientific-calculator.html",

            description:
                "Professional online scientific calculator with advanced mathematical functions."

        },

        application: {

            name:
                "ToolXone Scientific Calculator",

            applicationCategory:
                "CalculatorApplication"

        },

        breadcrumbs: [

            {

                name: "Home",

                url:
                    "https://www.toolxone.com/"

            },

            {

                name:
                    "Scientific Calculator",

                url:
                    "https://www.toolxone.com/scientific-calculator.html"

            }

        ],

        faq: [

            {

                question:
                    "What is a scientific calculator?",

                answer:
                    "A scientific calculator performs advanced mathematical calculations including trigonometry, logarithms, powers, roots, factorials and scientific notation."

            },

            {

                question:
                    "Is ToolXone Scientific Calculator free?",

                answer:
                    "Yes. ToolXone Scientific Calculator is completely free to use on desktop, tablet and mobile devices."

            }

        ]

    }

});

/* ==========================================================
   REGISTER PAGE
========================================================== */

ToolXoneSchemaRegistry.register(

    "ScientificCalculator",

    ScientificCalculatorSchema

);

})();