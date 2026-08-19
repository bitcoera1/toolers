/*!
 * ToolXone Age Calculator Schema
 *
 * Page SEO configuration for the Age Calculator.
 */

(function () {

    "use strict";


    const AgeCalculatorSchema =
        Object.freeze({


            version:
                "1.0.0",


            /*=========================================================
              META
            =========================================================*/

            meta: {

                basic: {

                    title:
                        "Age Calculator – Free Online Age Calculator | ToolXone",

                    description:
                        "Use ToolXone's free Age Calculator to calculate your exact age in years, months and days and find out how many days remain until your next birthday.",

                    keywords: [

                        "age calculator",

                        "age calculator online",

                        "free age calculator",

                        "exact age calculator",

                        "calculate age",

                        "age in years months days",

                        "age in days",

                        "birthday calculator",

                        "next birthday calculator",

                        "date of birth calculator",

                        "ToolXone"

                    ]

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/age-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone Age Calculator"

                },


                mobile: {

                    appleTitle:
                        "Age Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "Age Calculator – Free Online Age Calculator | ToolXone",

                    description:
                        "Calculate your exact age in years, months and days and find out how many days remain until your next birthday with ToolXone.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/age-calculator.html",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageWidth:
                        797,

                    imageHeight:
                        335,

                    imageAlt:
                        "ToolXone Age Calculator - Free Online Age Calculator",

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
                        "Age Calculator – Free Online Age Calculator | ToolXone",

                    description:
                        "Calculate your exact age and find out how many days remain until your next birthday with ToolXone.",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageAlt:
                        "ToolXone Age Calculator - Free Online Age Calculator"

                }

            },


            /*=========================================================
              SCHEMA
            =========================================================*/

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
                        "Age Calculator",

                    url:
                        "https://www.toolxone.com/age-calculator.html",

                    description:
                        "Free online age calculator that calculates exact age from a date of birth and provides detailed age and birthday information."

                },


                application: {

                    name:
                        "Age Calculator",

                    applicationCategory:
                        "UtilitiesApplication",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/age-calculator.html",

                    description:
                        "Free online age calculator that calculates exact age from a date of birth and provides detailed age and birthday information.",

                    offers: {

                        price:
                            "0",

                        priceCurrency:
                            "USD"

                    },

                    publisher: {

                        name:
                            "ToolXone",

                        url:
                            "https://www.toolxone.com"

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
                            "Age Calculator",

                        url:
                            "https://www.toolxone.com/age-calculator.html"

                    }

                ],


                faq: [

                    {

                        question:
                            "What does this age calculator show?",

                        answer:
                            "It shows your exact age in years, months and days, along with the number of days remaining until your next birthday."

                    },


                    {

                        question:
                            "How is age calculated?",

                        answer:
                            "Age is calculated by comparing your date of birth with the current date and determining the elapsed years, months and days."

                    },


                    {

                        question:
                            "Can I calculate age from any date of birth?",

                        answer:
                            "Yes. You can select any valid past date of birth supported by the calculator."

                    },


                    {

                        question:
                            "Does the Age Calculator accept future dates?",

                        answer:
                            "No. Future dates are not accepted as valid dates of birth."

                    },


                    {

                        question:
                            "Can the calculator tell me how many days are left until my birthday?",

                        answer:
                            "Yes. It calculates the number of days remaining until your next birthday."

                    },


                    {

                        question:
                            "What happens if my birthday has already passed this year?",

                        answer:
                            "The next birthday calculation uses your birthday in the following year when your birthday has already occurred in the current year."

                    }

                ]

            }

        });


    /*=========================================================
      REGISTER PAGE
    =========================================================*/

    ToolXoneSchemaRegistry.register(

        "AgeCalculator",

        AgeCalculatorSchema

    );


    console.info(
        "✓ Age Calculator schema registered."
    );


})();