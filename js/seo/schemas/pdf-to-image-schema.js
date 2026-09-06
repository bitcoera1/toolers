/*!
 * ==========================================================
 * ToolXone PDF to Image Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the PDF to Image tool.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";


const PDFToImageSchema =
Object.freeze({

    version:
        "1.0.0",


    /* ======================================================
       META
    ====================================================== */

    meta: {

        basic: {

            title:
                "PDF to Image Converter – PDF to JPG, PNG & WEBP | ToolXone",

            description:
                "Convert PDF pages to JPG, PNG or WEBP images online with ToolXone's free PDF to Image Converter. Choose your output format and convert PDF pages into high-quality image files quickly and easily.",

            keywords: [

                "pdf to image",

                "pdf to image converter",

                "pdf to jpg",

                "pdf to png",

                "pdf to webp",

                "convert pdf to image",

                "convert pdf to jpg",

                "convert pdf to png",

                "convert pdf to webp",

                "pdf page to image",

                "pdf pages to images",

                "pdf converter to image",

                "free pdf to image converter",

                "online pdf to image",

                "pdf to picture",

                "pdf to photo",

                "extract images from pdf",

                "convert pdf pages to jpg",

                "convert pdf pages to png",

                "convert pdf pages to webp",

                "ToolXone"

            ]

        },


        canonical: {

            href:
                "https://www.toolxone.com/pdf-to-image.html"

        },


        robots: {

            content:
                "index,follow"

        },


        application: {

            name:
                "ToolXone PDF to Image Converter"

        },


        mobile: {

            appleTitle:
                "PDF to Image Converter",

            themeColor:
                "#0f172a"

        },


        /* ==================================================
           OPEN GRAPH
        ================================================== */

        openGraph: {

            title:
                "PDF to Image Converter – PDF to JPG, PNG & WEBP | ToolXone",

            description:
                "Convert PDF pages to JPG, PNG or WEBP images online with ToolXone. Choose your preferred image format and convert PDF pages into high-quality images.",

            type:
                "website",

            url:
                "https://www.toolxone.com/pdf-to-image.html",

            image:
                "https://www.toolxone.com/images/toolxone-logo.jpg",

            imageWidth:
                797,

            imageHeight:
                335,

            imageAlt:
                "ToolXone PDF to Image Converter - Convert PDF Pages to JPG PNG and WEBP",

            siteName:
                "ToolXone",

            locale:
                "en_US"

        },


        /* ==================================================
           TWITTER
        ================================================== */

        twitter: {

            card:
                "summary_large_image",

            site:
                "@ToolXone",

            title:
                "PDF to Image Converter – PDF to JPG, PNG & WEBP | ToolXone",

            description:
                "Convert PDF pages to JPG, PNG or WEBP images online. Choose your output format and convert PDF pages into image files with ToolXone.",

            image:
                "https://www.toolxone.com/images/toolxone-logo.jpg",

            imageAlt:
                "ToolXone PDF to Image Converter"

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
                "PDF to Image Converter",

            url:
                "https://www.toolxone.com/pdf-to-image.html",

            description:
                "Free online PDF to Image Converter for converting PDF pages into JPG, PNG and WEBP image files."

        },


        application: {

            name:
                "ToolXone PDF to Image Converter",

            applicationCategory:
                "UtilitiesApplication"

        },


        /* ==================================================
           BREADCRUMBS
        ================================================== */

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

            },

            {

                name:
                    "PDF to Image",

                url:
                    "https://www.toolxone.com/pdf-to-image.html"

            }

        ],


        /* ==================================================
           FAQ
        ================================================== */

        faq: [

    {

        question:
            "Can I convert a PDF to JPG?",

        answer:
            "Yes. ToolXone's PDF to Image workflow is designed to support JPG output."

    },

    {

        question:
            "Can I convert a PDF to PNG?",

        answer:
            "Yes. PNG is one of the supported output formats in the PDF to Image workflow."

    },

    {

        question:
            "Can I convert a PDF to WebP?",

        answer:
            "Yes. WebP is included as an output option in the PDF to Image workflow."

    },

    {

        question:
            "Do I need a separate tool for PDF to JPG and PDF to PNG?",

        answer:
            "No. ToolXone combines these closely related workflows into one PDF to Image tool with an output-format selector."

    },

    {

        question:
            "Can I select specific pages from a PDF?",

        answer:
            "Yes. ToolXone's PDF to Image workflow lets you select the PDF pages you want to convert before starting the conversion."

    },

    {

        question:
            "Which image format should I choose?",

        answer:
            "JPG can be useful for compact everyday images, PNG can be useful when lossless image quality is preferred, and WebP can be useful for modern web-oriented image workflows."

    }

]

    }

});


/* ==========================================================
   REGISTER PAGE
========================================================== */

ToolXoneSchemaRegistry.register(

    "PDFToImage",

    PDFToImageSchema

);


})();