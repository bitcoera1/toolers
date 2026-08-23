/*!
 * ==========================================================
 * ToolXone PDF Tools Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the ToolXone PDF Tools Hub.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";

const PDFToolsSchema =
Object.freeze({

version:"1.0.0",

    meta: {

    basic: {

        title:
            "PDF Tools – Free Online PDF Tools for Convert, Merge, Compress & More | ToolXone",

        description:
            "Use ToolXone's free online PDF Tools to convert, organize, compress, edit and manage PDF documents. Access practical PDF workflows including PDF conversion, image conversion, document organization and more. Fast, secure, mobile-friendly and free to use.",

        keywords: [

            "PDF tools",

            "online PDF tools",

            "free PDF tools",

            "PDF converter",

            "PDF editor",

            "PDF compressor",

            "PDF converter online",

            "merge PDF",

            "split PDF",

            "compress PDF",

            "PDF to image",

            "image to PDF",

            "PDF to JPG",

            "PDF to PNG",

            "PDF to WebP",

            "online PDF converter",

            "free PDF converter",

            "PDF utilities",

            "document tools",

            "ToolXone"

        ]

    },

    canonical: {

        href:
            "https://www.toolxone.com/pdf-tools.html"

    },

    robots: {

        content:
            "index,follow"

    },

    application: {

        name:
            "ToolXone PDF Tools"

    },

    mobile: {

        appleTitle:
            "PDF Tools",

        themeColor:
            "#0f172a"

    },

    openGraph: {

        title:
            "PDF Tools – Free Online PDF Tools | ToolXone",

        description:
            "Use ToolXone's free online PDF Tools to convert, organize, compress, edit and manage PDF documents with practical tools designed for everyday work.",

        type:
            "website",

        url:
            "https://www.toolxone.com/pdf-tools.html",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageWidth:
            797,

        imageHeight:
            335,

        imageAlt:
            "ToolXone PDF Tools - Free Online PDF Tools",

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
            "PDF Tools - Free Online PDF Tools | ToolXone",

        description:
            "Convert, organize, compress and manage PDF documents with ToolXone's free online PDF Tools. Fast, practical and easy to use.",

        image:
            "https://www.toolxone.com/images/toolxone-logo.jpg",

        imageAlt:
            "ToolXone PDF Tools - Free Online PDF Tools"

    }

},

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
                "PDF Tools",

            url:
                "https://www.toolxone.com/pdf-tools.html",

            description:
                "A collection of practical online PDF tools for converting, organizing, compressing, editing and managing PDF documents."

        },

        application: {

            name:
                "ToolXone PDF Tools",

            applicationCategory:
                "UtilitiesApplication"

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
                    "PDF Tools",

                url:
                    "https://www.toolxone.com/pdf-tools.html"

            }

        ],

        faq: [

            {

                question:
                    "What are PDF tools?",

                answer:
                    "PDF tools are online utilities that help you work with PDF documents, including converting, organizing, compressing, editing and managing PDF files."

            },

            {

                question:
                    "What PDF tools are available on ToolXone?",

                answer:
                    "ToolXone's PDF Tools ecosystem is designed to provide practical PDF workflows such as PDF conversion, PDF to image, image to PDF, document organization, compression and other useful PDF utilities."

            },

            {

                question:
                    "Are ToolXone PDF Tools free?",

                answer:
                    "ToolXone provides free online tools designed to make everyday PDF and document workflows simple and accessible."

            },

            {

                question:
                    "Can I use ToolXone PDF Tools on mobile devices?",

                answer:
                    "Yes. ToolXone PDF Tools are designed with a mobile-friendly interface so users can access PDF workflows across desktop, tablet and mobile devices."

            }

        ]

    }

});


/* ==========================================================
   REGISTER PAGE
========================================================== */

ToolXoneSchemaRegistry.register(

    "PDFTools",

    PDFToolsSchema

);

})();