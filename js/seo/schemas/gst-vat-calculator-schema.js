/*!
 * ==========================================================
 * ToolXone GST / VAT Calculator Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the GST / VAT Calculator.
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

    const GSTVATCalculatorSchema =
        Object.freeze({

            version:
                "2.0.0",


            /* ======================================================
               META
            ====================================================== */

            meta: {

                basic: {

                    title:
                        "GST / VAT Calculator - Calculate Tax Amount & Final Price | ToolXone",

                    description:
                        "Use ToolXone's free GST / VAT Calculator to calculate GST or VAT, tax amount, base price and final price instantly from any tax rate.",

                    keywords: [

                        "gst calculator",

                        "gst calculator online",

                        "free gst calculator",

                        "gst tax calculator",

                        "goods and services tax calculator",

                        "vat calculator",

                        "vat calculator online",

                        "free vat calculator",

                        "vat tax calculator",

                        "gst vat calculator",

                        "tax calculator",

                        "sales tax calculator",

                        "tax amount calculator",

                        "tax inclusive calculator",

                        "tax exclusive calculator",

                        "calculate gst",

                        "calculate vat",

                        "calculate tax",

                        "tax inclusive price calculator",

                        "tax exclusive price calculator",

                        "base price calculator",

                        "final price after tax",

                        "ToolXone"

                    ]

                },


                canonical: {

                    href:
                        "https://www.toolxone.com/gst-vat-calculator.html"

                },


                robots: {

                    content:
                        "index,follow"

                },


                application: {

                    name:
                        "ToolXone GST / VAT Calculator"

                },


                mobile: {

                    appleTitle:
                        "GST / VAT Calculator",

                    themeColor:
                        "#0f172a"

                },


                openGraph: {

                    title:
                        "GST / VAT Calculator - Calculate Tax Amount & Final Price | ToolXone",

                    description:
                        "Calculate GST or VAT, tax amount, base price and final price instantly with ToolXone's free online GST / VAT Calculator.",

                    type:
                        "website",

                    url:
                        "https://www.toolxone.com/gst-vat-calculator.html",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageWidth:
                        797,

                    imageHeight:
                        335,

                    imageAlt:
                        "ToolXone GST / VAT Calculator - Free Online GST and VAT Calculator",

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
                        "GST / VAT Calculator - Calculate Tax Amount & Final Price | ToolXone",

                    description:
                        "Calculate GST or VAT, tax amounts, base prices and final prices with ToolXone's free GST / VAT Calculator.",

                    image:
                        "https://www.toolxone.com/images/toolxone-logo.jpg",

                    imageAlt:
                        "ToolXone GST / VAT Calculator"

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
                        "GST / VAT Calculator",

                    url:
                        "https://www.toolxone.com/gst-vat-calculator.html",

                    description:
                        "Free online GST and VAT calculator for calculating tax amounts, base prices and final prices from a tax rate."

                },


                /* --------------------------------------------------
                   APPLICATION
                -------------------------------------------------- */

                application: {

                    name:
                        "ToolXone GST / VAT Calculator",

                    applicationCategory:
                        "FinanceApplication",

                    applicationSubCategory:
                        "GST / VAT Calculator",

                    operatingSystem:
                        "Any",

                    url:
                        "https://www.toolxone.com/gst-vat-calculator.html",

                    description:
                        "Free online GST / VAT calculator for adding tax to a price or extracting the tax component from a tax-inclusive amount.",

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
                            "GST / VAT Calculator",

                        url:
                            "https://www.toolxone.com/gst-vat-calculator.html"

                    }

                ],


                /* --------------------------------------------------
                   FAQ
                -------------------------------------------------- */

                faq: [

                    {

                        question:
                            "What is GST / VAT?",

                        answer:
                            "GST (Goods and Services Tax) and VAT (Value Added Tax) are consumption taxes applied to the sale of goods and services. The terminology, rates and tax rules vary by jurisdiction."

                    },


                    {

                        question:
                            "How is GST or VAT calculated?",

                        answer:
                            "When tax is added to a tax-exclusive amount, the tax amount is calculated by multiplying the base price by the tax rate divided by 100. The tax amount is then added to the base price to determine the final price."

                    },


                    {

                        question:
                            "How do I calculate the price including GST or VAT?",

                        answer:
                            "Multiply the tax-exclusive price by 1 plus the tax rate divided by 100. For example, a $100 price with a 15% tax rate produces a $15 tax amount and a $115 final price."

                    },


                    {

                        question:
                            "How do I calculate GST or VAT from a tax-inclusive price?",

                        answer:
                            "Divide the tax-inclusive amount by 1 plus the tax rate expressed as a decimal to determine the underlying base price. Subtract the base price from the tax-inclusive amount to determine the tax component."

                    },


                    {

                        question:
                            "Can I use decimal GST or VAT rates?",

                        answer:
                            "Yes. The GST / VAT Calculator can calculate tax using decimal percentage rates as long as the rate is entered as a valid non-negative number."

                    },


                    {

                        question:
                            "What is the difference between tax-inclusive and tax-exclusive prices?",

                        answer:
                            "A tax-exclusive price does not include GST or VAT, so the tax is added to the base price. A tax-inclusive price already contains the tax, so the calculator separates the tax component from the total amount."

                    },


                    {

                        question:
                            "What does the base price mean?",

                        answer:
                            "The base price is the amount before GST or VAT is applied. When a tax-inclusive amount is entered, the base price represents the underlying pre-tax amount after the tax component has been extracted."

                    },


                    {

                        question:
                            "What does the final price mean?",

                        answer:
                            "The final price is the total amount after GST or VAT has been added when calculating from a tax-exclusive price. When a tax-inclusive amount is entered, the final price is the amount supplied because it already includes the tax."

                    },


                    {

                        question:
                            "Does this calculator determine which GST or VAT rate applies to my transaction?",

                        answer:
                            "No. The calculator performs the mathematical calculation using the tax rate you provide. The applicable GST or VAT rate, exemptions, registration requirements and tax treatment depend on the relevant jurisdiction and transaction."

                    },


                    {

                        question:
                            "Can GST and VAT rates vary by country?",

                        answer:
                            "Yes. GST and VAT systems, rates, exemptions, registration requirements and filing rules vary between countries and jurisdictions. Always use the applicable rate for the transaction you are calculating."

                    },


                    {

                        question:
                            "Is the ToolXone GST / VAT Calculator free to use?",

                        answer:
                            "Yes. The ToolXone GST / VAT Calculator is free to use and calculates GST or VAT amounts, base prices and final prices instantly."

                    }

                ]

            }

        });


    /* ==========================================================
       REGISTER PAGE
    ========================================================== */

    ToolXoneSchemaRegistry.register(

        "GSTVATCalculator",

        GSTVATCalculatorSchema

    );


    console.info(

        "✓ GST / VAT Calculator schema registered."

    );


})();