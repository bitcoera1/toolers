/*!
 * ==========================================================
 * ToolXone Image to PDF Schema
 * ----------------------------------------------------------
 * Page SEO configuration for the Image to PDF tool.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";


const ImageToPDFSchema =
Object.freeze({

    version:
        "1.0.0",


    /* ======================================================
       META
    ====================================================== */

    meta: {

        basic: {

            title:
                "Image to PDF Converter – JPG, PNG & WEBP to PDF | ToolXone",

            description:
                "Convert JPG, PNG and WEBP images to PDF online with ToolXone's free Image to PDF Converter. Combine multiple images into one PDF, choose page size, orientation, margins and image fit, then download your PDF instantly.",

            keywords: [

                "image to pdf",

                "image to pdf converter",

                "jpg to pdf",

                "png to pdf",

                "webp to pdf",

                "convert image to pdf",

                "convert jpg to pdf",

                "convert png to pdf",

                "convert webp to pdf",

                "multiple images to pdf",

                "images to pdf",

                "photo to pdf",

                "pictures to pdf",

                "free image to pdf converter",

                "online image to pdf",

                "combine images into pdf",

                "create pdf from images",

                "image converter to pdf",

                "ToolXone"

            ]

        },


        canonical: {

            href:
                "https://www.toolxone.com/image-to-pdf.html"

        },


        robots: {

            content:
                "index,follow"

        },


        application: {

            name:
                "ToolXone Image to PDF Converter"

        },


        mobile: {

            appleTitle:
                "Image to PDF Converter",

            themeColor:
                "#0f172a"

        },


        /* ==================================================
           OPEN GRAPH
        ================================================== */

        openGraph: {

            title:
                "Image to PDF Converter – JPG, PNG & WEBP to PDF | ToolXone",

            description:
                "Convert JPG, PNG and WEBP images into PDF files online. Combine multiple images, customize PDF settings and download your finished document with ToolXone.",

            type:
                "website",

            url:
                "https://www.toolxone.com/image-to-pdf.html",

            image:
                "https://www.toolxone.com/images/toolxone-logo.jpg",

            imageWidth:
                797,

            imageHeight:
                335,

            imageAlt:
                "ToolXone Image to PDF Converter - Convert JPG PNG and WEBP Images to PDF",

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
                "Image to PDF Converter – JPG, PNG & WEBP | ToolXone",

            description:
                "Convert JPG, PNG and WEBP images to PDF online. Combine multiple images, customize page settings and download your PDF instantly for free.",

            image:
                "https://www.toolxone.com/images/toolxone-logo.jpg",

            imageAlt:
                "ToolXone Image to PDF Converter"

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
                "Image to PDF Converter",

            url:
                "https://www.toolxone.com/image-to-pdf.html",

            description:
                "Free online Image to PDF Converter for converting JPG, PNG and WEBP images into PDF documents."

        },


        application: {

            name:
                "ToolXone Image to PDF Converter",

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
                    "Image to PDF",

                url:
                    "https://www.toolxone.com/image-to-pdf.html"

            }

        ],


        /* ==================================================
           FAQ
        ================================================== */

        faq: [

    {

        question:
            "Can I convert JPG images to PDF?",

        answer:
            "Yes. ToolXone Image to PDF supports JPG images and can combine one or multiple JPG files into a single PDF document."

    },


    {

        question:
            "Can I convert PNG images to PDF?",

        answer:
            "Yes. You can upload PNG images and convert them into a PDF document. Multiple PNG files can also be combined into one PDF."

    },


    {

        question:
            "Can I convert WebP images to PDF?",

        answer:
            "Yes. ToolXone supports WebP images and can convert them into PDF documents along with supported JPG and PNG images."

    },


    {

        question:
            "Can I combine multiple images into one PDF?",

        answer:
            "Yes. You can add multiple supported images and arrange them as pages in a single PDF document before creating and downloading the PDF."

    },


    {

        question:
            "Can I arrange the image pages before creating the PDF?",

        answer:
            "Yes. You can drag the image pages into the order you want before creating the PDF."

    },


    {

        question:
            "Which image formats are supported for Image to PDF?",

        answer:
            "ToolXone supports JPG, PNG and WebP images for the Image to PDF workflow."

    }

]

    }

});


/* ==========================================================
   REGISTER PAGE
========================================================== */

ToolXoneSchemaRegistry.register(

    "ImageToPDF",

    ImageToPDFSchema

);


})();