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
                    "What is a PDF to Image Converter?",

                answer:
                    "A PDF to Image Converter turns PDF pages into image files such as JPG, PNG and WEBP. ToolXone lets you convert PDF pages into image files and choose the output format that best fits your needs."

            },


            {

                question:
                    "Can I convert a PDF to JPG?",

                answer:
                    "Yes. ToolXone PDF to Image supports JPG output for converting PDF pages into JPG image files."

            },


            {

                question:
                    "Can I convert a PDF to PNG?",

                answer:
                    "Yes. You can convert PDF pages into PNG images using ToolXone PDF to Image Converter."

            },


            {

                question:
                    "Can I convert a PDF to WEBP?",

                answer:
                    "Yes. ToolXone supports WEBP output, allowing PDF pages to be converted into WEBP image files."

            },


            {

                question:
                    "Can I convert multiple PDF pages into images?",

                answer:
                    "Yes. ToolXone can convert PDF pages into image files, allowing pages from a PDF document to be processed as images."

            },


            {

                question:
                    "Which image formats are supported?",

                answer:
                    "ToolXone PDF to Image supports JPG, PNG and WEBP output formats."

            },


            {

                question:
                    "Is the PDF to Image Converter free?",

                answer:
                    "Yes. ToolXone PDF to Image Converter is designed as a free online tool for converting PDF pages into supported image formats."

            },


            {

                question:
                    "Can I download the converted images?",

                answer:
                    "Yes. After converting the PDF pages, the resulting image files can be downloaded for use in your documents, projects and other workflows."

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