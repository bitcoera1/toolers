/*!
 * ==========================================================
 * ToolXone Basic Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Basic Calculator.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

    "use strict";

    const BasicCalculatorSchema =
        Object.freeze({

            version: "1.0.0",

            /*
             * ==========================================================
             * META
             * ==========================================================
             */

            meta: {

                basic: {

                    title:
                        "Basic Calculator - Free Online Calculator | ToolXone",

                    description:
                        "Use ToolXone's free Basic Calculator for addition, subtraction, multiplication, division, decimals and everyday calculations. Fast, accurate and easy to use."

                },

                canonical: {

                    href:
                        "https://www.toolxone.com/calculator.html"

                },

                robots: {

                    content:
                        "index,follow"

                },

                application: {

                    name:
                        "ToolXone Basic Calculator"

                },

                mobile: {

                    appleTitle:
                        "Basic Calculator",

                    themeColor:
                        "#0f172a"

                }

            },

            /*
             * ==========================================================
             * STRUCTURED DATA
             * ==========================================================
             */

            schema: {

                application: {

                    "@id":
                        "https://www.toolxone.com/calculator.html#softwareapplication",

                    name:
                        "Basic Calculator",

                    alternateName:
                        "ToolXone Basic Calculator",

                    applicationCategory:
                        "UtilitiesApplication",

                    applicationSubCategory:
                        "Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/calculator.html",

                    description:
                        "A free online basic calculator for addition, subtraction, multiplication, division, decimals and everyday calculations.",

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

                        "@type":
                            "Organization",

                        "@id":
                            "https://www.toolxone.com/#organization",

                        name:
                            "ToolXone",

                        url:
                            "https://www.toolxone.com/"

                    }

                }

            }

        });

    /*
     * ==========================================================
     * REGISTER PAGE
     * ==========================================================
     */

    if (
        window.ToolXoneSchemaRegistry
    ) {

        ToolXoneSchemaRegistry.register(

            "BasicCalculator",

            BasicCalculatorSchema

        );

        console.info(
            "✓ Basic Calculator schema registered."
        );

    }
    else {

        console.warn(
            "ToolXoneSchemaRegistry not found."
        );

    }

})();