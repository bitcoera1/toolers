/*
==========================================================
TOOLXONE PDF ENGINE
==========================================================

RESPONSIBILITY
----------------------------------------------------------
- Shared PDF infrastructure for all ToolXone PDF tools
- Provides PDF library access helpers
- Provides shared page-dimension calculations
- Provides shared margin calculations
- Provides shared image-placement calculations
- Provides shared PDF/file utility helpers
- Provides safe PDF capability detection
- Provides a clean coordination layer for PDF tools

IMPORTANT
----------------------------------------------------------
- PDF-only system
- Does NOT modify the original 20-tool architecture
- Does NOT modify ToolXoneToolsRegistry
- Does NOT own tool-specific conversion workflows
- Does NOT own PDF workspace UI
- Does NOT own file-manager UI
- Does NOT own download UI
- Does NOT replace pdf-to-image.js
- Does NOT replace image-to-pdf.js

ARCHITECTURE
----------------------------------------------------------

                ToolXonePDFEngine
                       |
        +--------------+--------------+
        |              |              |
     jsPDF           PDF.js       PDF Utilities
        |              |              |
 Image → PDF      PDF → Image     Shared Layout
                                        |
                         +--------------+--------------+
                         |                             |
                  pdf-to-image.js              image-to-pdf.js

ISOLATION
----------------------------------------------------------
This module only exposes PDF-specific globals using the
ToolXonePDF namespace.

==========================================================
*/


(function (window) {

    "use strict";


    /* ======================================================
       NAMESPACE
    ====================================================== */

    const ToolXonePDFEngine = {


        /* ==================================================
           VERSION
        ================================================== */

        version: "1.0.0",


        /* ==================================================
           LIBRARY ACCESS
        ================================================== */

        libraries: {

            jsPDF: null,

            pdfjs: null

        },


        /* ==================================================
           INITIALIZATION
        ================================================== */

        initialized: false,


        /* ==================================================
           CONFIGURATION
        ================================================== */

        defaults: {

            pageSize: "A4",

            orientation: "auto",

            margin: "normal",

            imageFit: "fit-inside-page",

            unit: "mm"

        },


        /* ==================================================
           STANDARD PAGE DIMENSIONS
           Values are millimeters.
        ================================================== */

        pageSizes: {

            A4: {
                width: 210,
                height: 297
            },

            A3: {
                width: 297,
                height: 420
            },

            A5: {
                width: 148,
                height: 210
            },

            Letter: {
                width: 215.9,
                height: 279.4
            },

            Legal: {
                width: 215.9,
                height: 355.6
            },

            Tabloid: {
                width: 279.4,
                height: 431.8
            }

        },


        /* ==================================================
           STANDARD MARGINS
           Values are millimeters.
        ================================================== */

        margins: {

            none: 0,

            narrow: 5,

            normal: 10,

            wide: 20

        }


    };


    /* ======================================================
       LIBRARY HELPERS
       ====================================================== */


    function detectJSPDF() {

        /*
         * jsPDF is normally exposed through:
         *
         * window.jspdf.jsPDF
         *
         * depending on the CDN build.
         */

        if (
            window.jspdf &&
            typeof window.jspdf.jsPDF === "function"
        ) {

            return window.jspdf;

        }


        /*
         * Support a direct global if another build exposes
         * jsPDF differently.
         */

        if (
            typeof window.jsPDF === "function"
        ) {

            return {
                jsPDF: window.jsPDF
            };

        }


        return null;

    }


    function detectPDFJS() {

        /*
         * PDF.js may be exposed as pdfjsLib depending on
         * how the library is loaded.
         */

        if (window.pdfjsLib) {

            return window.pdfjsLib;

        }


        if (window.pdfjs) {

            return window.pdfjs;

        }


        return null;

    }


    function refreshLibraries() {

        ToolXonePDFEngine.libraries.jsPDF =
            detectJSPDF();

        ToolXonePDFEngine.libraries.pdfjs =
            detectPDFJS();


        ToolXonePDFEngine.initialized = true;


        return ToolXonePDFEngine.libraries;

    }


    function getJSPDF() {

        if (
            !ToolXonePDFEngine.libraries.jsPDF
        ) {

            refreshLibraries();

        }

        return ToolXonePDFEngine.libraries.jsPDF;

    }


    function getPDFJS() {

        if (
            !ToolXonePDFEngine.libraries.pdfjs
        ) {

            refreshLibraries();

        }

        return ToolXonePDFEngine.libraries.pdfjs;

    }


    function hasJSPDF() {

        return Boolean(
            getJSPDF() &&
            typeof getJSPDF().jsPDF === "function"
        );

    }


    function hasPDFJS() {

        return Boolean(
            getPDFJS()
        );

    }


    /* ======================================================
       jsPDF FACTORY
    ====================================================== */


    function createJSPDF(options = {}) {

        const library = getJSPDF();


        if (
            !library ||
            typeof library.jsPDF !== "function"
        ) {

            throw new Error(
                "jsPDF is not available."
            );

        }


        const settings = {

            orientation:
                options.orientation || "portrait",

            unit:
                options.unit || "mm",

            format:
                options.format || options.pageSize || "A4"

        };


        return new library.jsPDF(settings);

    }


    /* ======================================================
       PAGE SIZE
    ====================================================== */


    function normalizePageSize(pageSize) {

        if (!pageSize) {

            return "A4";

        }


        const value =
            String(pageSize).trim();


        const aliases = {

            a4: "A4",

            a3: "A3",

            a5: "A5",

            letter: "Letter",

            legal: "Legal",

            tabloid: "Tabloid"

        };


        const normalized =
            aliases[value.toLowerCase()];


        return normalized || "A4";

    }


    function getPageSize(pageSize) {

        const normalized =
            normalizePageSize(pageSize);


        const size =
            ToolXonePDFEngine.pageSizes[
                normalized
            ];


        if (!size) {

            return {
                width: 210,
                height: 297
            };

        }


        return {

            width: size.width,

            height: size.height

        };

    }


    /* ======================================================
       ORIENTATION
    ====================================================== */


    function normalizeOrientation(orientation) {

        if (!orientation) {

            return "auto";

        }


        const value =
            String(orientation)
                .trim()
                .toLowerCase();


        if (
            value === "landscape" ||
            value === "horizontal"
        ) {

            return "landscape";

        }


        if (
            value === "portrait" ||
            value === "vertical"
        ) {

            return "portrait";

        }


        return "auto";

    }


    function resolveOrientation(
        orientation,
        imageWidth = null,
        imageHeight = null
    ) {

        const normalized =
            normalizeOrientation(orientation);


        if (normalized !== "auto") {

            return normalized;

        }


        if (
            Number.isFinite(imageWidth) &&
            Number.isFinite(imageHeight) &&
            imageWidth > 0 &&
            imageHeight > 0
        ) {

            return imageWidth > imageHeight
                ? "landscape"
                : "portrait";

        }


        return "portrait";

    }


    /* ======================================================
       ORIENTED PAGE DIMENSIONS
    ====================================================== */


    function getPageDimensions(
        pageSize = "A4",
        orientation = "portrait"
    ) {

        const size =
            getPageSize(pageSize);


        const resolvedOrientation =
            resolveOrientation(
                orientation
            );


        if (
            resolvedOrientation === "landscape"
        ) {

            return {

                width: size.height,

                height: size.width,

                orientation:
                    "landscape"

            };

        }


        return {

            width: size.width,

            height: size.height,

            orientation:
                "portrait"

        };

    }


    /* ======================================================
       MARGIN
    ====================================================== */


    function normalizeMargin(margin) {

        if (
            typeof margin === "number" &&
            Number.isFinite(margin)
        ) {

            return Math.max(
                0,
                margin
            );

        }


        if (!margin) {

            return ToolXonePDFEngine.margins.normal;

        }


        const value =
            String(margin)
                .trim()
                .toLowerCase();


        if (
            Object.prototype.hasOwnProperty.call(
                ToolXonePDFEngine.margins,
                value
            )
        ) {

            return ToolXonePDFEngine.margins[
                value
            ];

        }


        const numeric =
            Number(value);


        if (
            Number.isFinite(numeric)
        ) {

            return Math.max(
                0,
                numeric
            );

        }


        return ToolXonePDFEngine.margins.normal;

    }


    function getMargin(margin) {

        return normalizeMargin(
            margin
        );

    }


    /* ======================================================
       CONTENT AREA
    ====================================================== */


    function getContentArea(
        pageWidth,
        pageHeight,
        margin
    ) {

        const safeMargin =
            normalizeMargin(margin);


        return {

            width:
                Math.max(
                    0,
                    pageWidth -
                    (safeMargin * 2)
                ),

            height:
                Math.max(
                    0,
                    pageHeight -
                    (safeMargin * 2)
                ),

            margin:
                safeMargin

        };

    }


    /* ======================================================
       IMAGE FIT MODES
    ====================================================== */


    function normalizeImageFit(imageFit) {

        if (!imageFit) {

            return "fit-inside-page";

        }


        const value =
            String(imageFit)
                .trim()
                .toLowerCase();


        const aliases = {

            fit: "fit-inside-page",

            contain: "fit-inside-page",

            "fit-inside":
                "fit-inside-page",

            "fit-inside-page":
                "fit-inside-page",

            cover:
                "fill-page",

            "fill-page":
                "fill-page",

            original:
                "original",

            actual:
                "original"

        };


        return aliases[value]
            || "fit-inside-page";

    }


    /* ======================================================
       IMAGE PLACEMENT
    ====================================================== */


    function calculateImagePlacement(options = {}) {

        const pageWidth =
            Number(options.pageWidth);

        const pageHeight =
            Number(options.pageHeight);

        const imageWidth =
            Number(options.imageWidth);

        const imageHeight =
            Number(options.imageHeight);


        if (
            !Number.isFinite(pageWidth) ||
            !Number.isFinite(pageHeight) ||
            !Number.isFinite(imageWidth) ||
            !Number.isFinite(imageHeight) ||
            pageWidth <= 0 ||
            pageHeight <= 0 ||
            imageWidth <= 0 ||
            imageHeight <= 0
        ) {

            return null;

        }


        const margin =
            normalizeMargin(
                options.margin
            );


        const content =
            getContentArea(
                pageWidth,
                pageHeight,
                margin
            );


        const fit =
            normalizeImageFit(
                options.imageFit
            );


        /* ----------------------------------------------
           ORIGINAL SIZE
        ---------------------------------------------- */

        if (fit === "original") {

            const x =
                margin +
                Math.max(
                    0,
                    (content.width -
                        imageWidth) / 2
                );


            const y =
                margin +
                Math.max(
                    0,
                    (content.height -
                        imageHeight) / 2
                );


            return {

                x,

                y,

                width: imageWidth,

                height: imageHeight,

                scale: 1

            };

        }


        /* ----------------------------------------------
           FILL PAGE / COVER
        ---------------------------------------------- */

        if (fit === "fill-page") {

            const scale =
                Math.max(
                    content.width /
                        imageWidth,

                    content.height /
                        imageHeight
                );


            const width =
                imageWidth * scale;


            const height =
                imageHeight * scale;


            return {

                x:
                    margin +
                    (content.width - width) / 2,

                y:
                    margin +
                    (content.height - height) / 2,

                width,

                height,

                scale

            };

        }


        /* ----------------------------------------------
           FIT INSIDE PAGE
        ---------------------------------------------- */

        const scale =
            Math.min(
                content.width /
                    imageWidth,

                content.height /
                    imageHeight
            );


        const width =
            imageWidth * scale;


        const height =
            imageHeight * scale;


        return {

            x:
                margin +
                (content.width - width) / 2,

            y:
                margin +
                (content.height - height) / 2,

            width,

            height,

            scale

        };

    }


    /* ======================================================
       IMAGE DIMENSION HELPERS
    ====================================================== */


    function getImageDimensions(image) {

        if (!image) {

            return null;

        }


        const width =
            Number(
                image.naturalWidth ||
                image.width
            );


        const height =
            Number(
                image.naturalHeight ||
                image.height
            );


        if (
            !Number.isFinite(width) ||
            !Number.isFinite(height) ||
            width <= 0 ||
            height <= 0
        ) {

            return null;

        }


        return {

            width,

            height,

            aspectRatio:
                width / height

        };

    }


    /* ======================================================
       PIXEL → MILLIMETER
    ====================================================== */


    function pixelsToMillimeters(
        pixels,
        dpi = 96
    ) {

        const value =
            Number(pixels);

        const resolution =
            Number(dpi);


        if (
            !Number.isFinite(value) ||
            !Number.isFinite(resolution) ||
            resolution <= 0
        ) {

            return 0;

        }


        return (
            value / resolution
        ) * 25.4;

    }


    function millimetersToPixels(
        millimeters,
        dpi = 96
    ) {

        const value =
            Number(millimeters);

        const resolution =
            Number(dpi);


        if (
            !Number.isFinite(value) ||
            !Number.isFinite(resolution) ||
            resolution <= 0
        ) {

            return 0;

        }


        return (
            value / 25.4
        ) * resolution;

    }


    /* ======================================================
       FILE HELPERS
    ====================================================== */


    function isFile(value) {

        return (
            typeof File !== "undefined" &&
            value instanceof File
        );

    }


    function isBlob(value) {

        return (
            typeof Blob !== "undefined" &&
            value instanceof Blob
        );

    }


    function getFileExtension(
        filename
    ) {

        if (!filename) {

            return "";

        }


        const value =
            String(filename)
                .trim();


        const lastDot =
            value.lastIndexOf(".");


        if (
            lastDot === -1 ||
            lastDot === value.length - 1
        ) {

            return "";

        }


        return value
            .slice(lastDot + 1)
            .toLowerCase();

    }


    function getBaseFilename(
        filename
    ) {

        if (!filename) {

            return "";

        }


        const value =
            String(filename)
                .trim();


        const lastDot =
            value.lastIndexOf(".");


        if (lastDot <= 0) {

            return value;

        }


        return value.slice(
            0,
            lastDot
        );

    }


    function sanitizeFilename(
        filename,
        fallback = "toolxone-file"
    ) {

        let value =
            String(
                filename || ""
            ).trim();


        value =
            value.replace(
                /[<>:"/\\|?*\x00-\x1F]/g,
                "-"
            );


        value =
            value.replace(
                /\s+/g,
                " "
            );


        value =
            value.replace(
                /-+/g,
                "-"
            );


        value =
            value.replace(
                /^[-.\s]+|[-.\s]+$/g,
                ""
            );


        return value || fallback;

    }


    /* ======================================================
       OBJECT URL HELPERS
    ====================================================== */


    function createObjectURL(
        blob
    ) {

        if (
            !blob ||
            !window.URL ||
            typeof window.URL.createObjectURL !==
                "function"
        ) {

            return null;

        }


        return window.URL.createObjectURL(
            blob
        );

    }


    function revokeObjectURL(
        url
    ) {

        if (
            !url ||
            !window.URL ||
            typeof window.URL.revokeObjectURL !==
                "function"
        ) {

            return;

        }


        try {

            window.URL.revokeObjectURL(
                url
            );

        } catch (error) {

            console.warn(
                "ToolXone PDF Engine: unable to revoke object URL.",
                error
            );

        }

    }


    /* ======================================================
       BLOB HELPERS
    ====================================================== */


    function ensureBlob(
        value,
        type = "application/octet-stream"
    ) {

        if (isBlob(value)) {

            return value;

        }


        if (
            value instanceof ArrayBuffer
        ) {

            return new Blob(
                [value],
                { type }
            );

        }


        if (
            ArrayBuffer.isView(value)
        ) {

            return new Blob(
                [value],
                { type }
            );

        }


        return null;

    }


    /* ======================================================
       DOWNLOAD NAME HELPERS
    ====================================================== */


    function ensureExtension(
        filename,
        extension
    ) {

        const cleanName =
            sanitizeFilename(
                filename
            );


        const cleanExtension =
            String(
                extension || ""
            )
            .replace(
                /^\./,
                ""
            )
            .toLowerCase();


        if (!cleanExtension) {

            return cleanName;

        }


        if (
            getFileExtension(
                cleanName
            ) === cleanExtension
        ) {

            return cleanName;

        }


        return (
            cleanName +
            "." +
            cleanExtension
        );

    }


    /* ======================================================
       SETTINGS NORMALIZATION
    ====================================================== */


    function normalizeSettings(
        settings = {}
    ) {

        const source =
            settings || {};


        return {

            pageSize:
                normalizePageSize(
                    source.pageSize ||
                    ToolXonePDFEngine.defaults.pageSize
                ),

            orientation:
                normalizeOrientation(
                    source.orientation ||
                    ToolXonePDFEngine.defaults.orientation
                ),

            margin:
                normalizeMargin(
                    source.margin ??
                    ToolXonePDFEngine.defaults.margin
                ),

            imageFit:
                normalizeImageFit(
                    source.imageFit ||
                    ToolXonePDFEngine.defaults.imageFit
                ),

            unit:
                source.unit ||
                ToolXonePDFEngine.defaults.unit

        };

    }


    /* ======================================================
       PDF SETTINGS → PAGE
    ====================================================== */


    function resolvePageFromSettings(
        settings = {},
        imageWidth = null,
        imageHeight = null
    ) {

        const normalized =
            normalizeSettings(
                settings
            );


        const orientation =
            resolveOrientation(
                normalized.orientation,
                imageWidth,
                imageHeight
            );


        const dimensions =
            getPageDimensions(
                normalized.pageSize,
                orientation
            );


        return {

            pageSize:
                normalized.pageSize,

            orientation,

            width:
                dimensions.width,

            height:
                dimensions.height,

            margin:
                normalized.margin,

            imageFit:
                normalized.imageFit,

            unit:
                normalized.unit

        };

    }


    /* ======================================================
       SAFE ERROR NORMALIZATION
    ====================================================== */


    function normalizeError(
        error,
        fallbackMessage =
            "PDF processing failed."
    ) {

        if (
            error instanceof Error
        ) {

            return {

                name:
                    error.name ||
                    "Error",

                message:
                    error.message ||
                    fallbackMessage,

                original:
                    error

            };

        }


        if (
            typeof error === "string"
        ) {

            return {

                name: "Error",

                message:
                    error ||
                    fallbackMessage,

                original:
                    error

            };

        }


        return {

            name: "Error",

            message:
                fallbackMessage,

            original:
                error || null

        };

    }


    /* ======================================================
       CAPABILITY REPORT
    ====================================================== */


    function getCapabilities() {

        refreshLibraries();


        return {

            jsPDF:
                hasJSPDF(),

            pdfJS:
                hasPDFJS(),

            canvas:
                typeof HTMLCanvasElement !==
                "undefined",

            fileAPI:
                typeof File !==
                "undefined",

            blob:
                typeof Blob !==
                "undefined",

            objectURL:
                Boolean(
                    window.URL &&
                    typeof window.URL.createObjectURL ===
                        "function"
                ),

            download:
                typeof document !==
                "undefined"

        };

    }


    /* ======================================================
       ENGINE RESET
    ====================================================== */


    function reset() {

        ToolXonePDFEngine.libraries.jsPDF =
            null;

        ToolXonePDFEngine.libraries.pdfjs =
            null;

        ToolXonePDFEngine.initialized =
            false;

    }


    /* ======================================================
       PUBLIC API
    ====================================================== */


    ToolXonePDFEngine.init =
        refreshLibraries;

    ToolXonePDFEngine.reset =
        reset;


    ToolXonePDFEngine.getJSPDF =
        getJSPDF;

    ToolXonePDFEngine.getPDFJS =
        getPDFJS;

    ToolXonePDFEngine.hasJSPDF =
        hasJSPDF;

    ToolXonePDFEngine.hasPDFJS =
        hasPDFJS;

    ToolXonePDFEngine.createJSPDF =
        createJSPDF;


    ToolXonePDFEngine.normalizePageSize =
        normalizePageSize;

    ToolXonePDFEngine.getPageSize =
        getPageSize;

    ToolXonePDFEngine.normalizeOrientation =
        normalizeOrientation;

    ToolXonePDFEngine.resolveOrientation =
        resolveOrientation;

    ToolXonePDFEngine.getPageDimensions =
        getPageDimensions;


    ToolXonePDFEngine.normalizeMargin =
        normalizeMargin;

    ToolXonePDFEngine.getMargin =
        getMargin;

    ToolXonePDFEngine.getContentArea =
        getContentArea;


    ToolXonePDFEngine.normalizeImageFit =
        normalizeImageFit;

    ToolXonePDFEngine.calculateImagePlacement =
        calculateImagePlacement;

    ToolXonePDFEngine.getImageDimensions =
        getImageDimensions;


    ToolXonePDFEngine.pixelsToMillimeters =
        pixelsToMillimeters;

    ToolXonePDFEngine.millimetersToPixels =
        millimetersToPixels;


    ToolXonePDFEngine.isFile =
        isFile;

    ToolXonePDFEngine.isBlob =
        isBlob;

    ToolXonePDFEngine.getFileExtension =
        getFileExtension;

    ToolXonePDFEngine.getBaseFilename =
        getBaseFilename;

    ToolXonePDFEngine.sanitizeFilename =
        sanitizeFilename;

    ToolXonePDFEngine.ensureExtension =
        ensureExtension;


    ToolXonePDFEngine.createObjectURL =
        createObjectURL;

    ToolXonePDFEngine.revokeObjectURL =
        revokeObjectURL;

    ToolXonePDFEngine.ensureBlob =
        ensureBlob;


    ToolXonePDFEngine.normalizeSettings =
        normalizeSettings;

    ToolXonePDFEngine.resolvePageFromSettings =
        resolvePageFromSettings;


    ToolXonePDFEngine.normalizeError =
        normalizeError;

    ToolXonePDFEngine.getCapabilities =
        getCapabilities;


    /* ======================================================
       GLOBAL PDF NAMESPACE
    ====================================================== */

    window.ToolXonePDFEngine =
        ToolXonePDFEngine;


    /*
     * Initialize library detection only.
     *
     * This does NOT throw if a PDF library has not yet
     * loaded. That is intentional because different PDF
     * tools load different libraries.
     */

    refreshLibraries();


})(window);