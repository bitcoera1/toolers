/*
==========================================================
 ToolXone Scientific Calculator Content
 Version: 1.0.0
==========================================================
*/

(function () {

"use strict";

if (!window.ToolXoneContentRegistry) {

    console.error(
        "[Scientific Content] Content Registry not found."
    );

    return;

}

/* -------------------------------------------------------
   ARTICLE
------------------------------------------------------- */

window.ToolXoneContentRegistry.register(
    "articles",

    "scientific-calculator",

    {

        title:
            "Why Use a Scientific Calculator?",

        introduction:
            "A scientific calculator helps solve advanced mathematical calculations including trigonometry, logarithms, exponents, roots, percentages, constants and engineering calculations.",

        sections: [

            {

                heading:
                    "Powerful Mathematical Functions",

                content:
                    "Perform complex calculations accurately including sin, cos, tan, logarithms, powers, roots and scientific notation."

            },

            {

                heading:
                    "Designed for Students and Professionals",

                content:
                    "Ideal for school, college, university, engineering, finance and research work."

            }

        ]

    }

);

console.info(
    "✓ Scientific Calculator article registered."
);

/* -------------------------------------------------------
   FAQ
------------------------------------------------------- */

window.ToolXoneContentRegistry.register(

    "faq",

    "scientific-calculator",

    [

        {

            question:
                "What can I calculate with this scientific calculator?",

            answer:
                "You can perform trigonometric, logarithmic, exponential, root, percentage, factorial and many other advanced mathematical calculations."

        },

        {

            question:
                "Does this calculator support engineering calculations?",

            answer:
                "Yes. It is suitable for students, engineers, researchers and professionals who need accurate scientific calculations."

        },

        {

            question:
                "Can I use this calculator on mobile?",

            answer:
                "Yes. ToolXone Scientific Calculator is fully responsive and works on desktop, tablet and mobile devices."

        }

    ]

);

console.info(
    "✓ Scientific Calculator FAQ registered."
);

/* -------------------------------------------------------
   RELATED TOOLS
------------------------------------------------------- */

window.ToolXoneContentRegistry.register(

    "related",

    "scientific-calculator",

    [

        {

            title:
                "Percentage Calculator",

            description:
                "Calculate percentages quickly and accurately.",

            url:
                "percentage-calculator.html"

        },

        {

            title:
                "Age Calculator",

            description:
                "Calculate exact age between dates.",

            url:
                "age-calculator.html"

        },

        {

            title:
                "BMI Calculator",

            description:
                "Calculate Body Mass Index instantly.",

            url:
                "bmi-calculator.html"

        }

    ]

);

console.info(
    "✓ Scientific Calculator related tools registered."
);

/* -------------------------------------------------------
   SCHEMA
------------------------------------------------------- */

window.ToolXoneContentRegistry.register(

    "schema",

    "scientific-calculator",

    {

        "@context": "https://schema.org",

        "@type": "WebApplication",

        "name":
            "Scientific Calculator",

        "applicationCategory":
            "CalculatorApplication",

        "operatingSystem":
            "Any",

        "url":
            "/scientific-calculator.html",

        "description":
            "Free online scientific calculator for trigonometry, logarithms, powers, roots and advanced mathematics."

    }

);

console.info(
    "✓ Scientific Calculator schema registered."
);

/* -------------------------------------------------------
   METADATA
------------------------------------------------------- */

window.ToolXoneContentRegistry.register(

    "metadata",

    "scientific-calculator",

    {

        title:
            "Scientific Calculator - Free Online Scientific Calculator | ToolXone",

        description:
            "Use ToolXone Scientific Calculator to solve advanced mathematical calculations including trigonometry, logarithms, powers, roots, exponents, constants, percentages and engineering calculations instantly.",

        keywords: [

            "scientific calculator",

            "online scientific calculator",

            "engineering calculator",

            "math calculator",

            "free calculator",

            "ToolXone"

        ],

        canonical:
            "/scientific-calculator.html",

        robots:
            "index,follow",

        author:
            "ToolXone"

    }

);

console.info(

    "✓ Scientific Calculator metadata registered."

);

})();
