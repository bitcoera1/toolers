/*!
 * ============================================================
 * ToolXone Image Optimizer
 * ------------------------------------------------------------
 * Image Performance Analysis Engine
 * Version : 1.0.0
 * Phase   : 3
 * Mission : 3.6
 * ============================================================
 */

(function () {

"use strict";

/* ==========================================================
   ENGINE INFO
========================================================== */

const ENGINE_NAME =
    "ToolXone Image Optimizer";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const configuration = {

    enabled: true,

    debug: false,

    analyzeImages: true,

    analyzeFormats: true,

    analyzeLazyLoading: true,

    analyzeAccessibility: true,

    recommendations: true

};

/* ==========================================================
   IMAGE REGISTRY
========================================================== */

const imageRegistry = {

    images: [],

    lazyLoaded: [],

    missingAlt: [],

    responsive: [],

    largeImages: [],

    formats: {},

    recommendations: []

};

/* ==========================================================
   STATISTICS
========================================================== */

const statistics = {

    totalImages: 0,

    optimizedImages: 0,

    missingAlt: 0,

    lazyImages: 0,

    responsiveImages: 0,

    largeImages: 0,

    score: 100

};

/* ==========================================================
   INFORMATION
========================================================== */

function info() {

    return {

        name: ENGINE_NAME,

        version: ENGINE_VERSION,

        configuration

    };

}

/* ==========================================================
   IMAGE DISCOVERY
========================================================== */

function discoverImages() {

    imageRegistry.images =

        Array.from(

            document.images || []

        );

    statistics.totalImages =

        imageRegistry.images.length;

    return imageRegistry.images;

}

/* ==========================================================
   ALT TEXT ANALYSIS
========================================================== */

function analyzeAltText() {

    imageRegistry.missingAlt = [];

    imageRegistry.images.forEach(function (img) {

        if (

            !img.hasAttribute("alt") ||

            img.alt.trim() === ""

        ) {

            imageRegistry.missingAlt.push(img);

        }

    });

    statistics.missingAlt =

        imageRegistry.missingAlt.length;

}

/* ==========================================================
   LAZY LOADING ANALYSIS
========================================================== */

function analyzeLazyLoading() {

    imageRegistry.lazyLoaded = [];

    imageRegistry.images.forEach(function (img) {

        if (

            img.loading === "lazy"

        ) {

            imageRegistry.lazyLoaded.push(img);

        }

    });

    statistics.lazyImages =

        imageRegistry.lazyLoaded.length;

}

/* ==========================================================
   RESPONSIVE IMAGE ANALYSIS
========================================================== */

function analyzeResponsiveImages() {

    imageRegistry.responsive = [];

    imageRegistry.images.forEach(function (img) {

        if (

            img.hasAttribute("srcset") ||

            img.hasAttribute("sizes")

        ) {

            imageRegistry.responsive.push(img);

        }

    });

    statistics.responsiveImages =

        imageRegistry.responsive.length;

}

/* ==========================================================
   IMAGE SIZE ANALYSIS
========================================================== */

function analyzeImageDimensions() {

    imageRegistry.largeImages = [];

    imageRegistry.images.forEach(function (img) {

        if (

            img.naturalWidth > 1920 ||

            img.naturalHeight > 1080

        ) {

            imageRegistry.largeImages.push(img);

        }

    });

    statistics.largeImages =

        imageRegistry.largeImages.length;

}

/* ==========================================================
   IMAGE FORMAT ANALYSIS
========================================================== */

function analyzeFormats() {

    imageRegistry.formats = {};

    imageRegistry.images.forEach(function (img) {

        const src =

            (img.currentSrc ||

             img.src ||

             "").toLowerCase();

        let extension =

            "unknown";

        if (src.includes(".webp"))

            extension = "webp";

        else if (src.includes(".avif"))

            extension = "avif";

        else if (src.includes(".png"))

            extension = "png";

        else if (src.includes(".jpg") ||

                 src.includes(".jpeg"))

            extension = "jpeg";

        else if (src.includes(".svg"))

            extension = "svg";

        else if (src.includes(".gif"))

            extension = "gif";

        imageRegistry.formats[extension] =

            (imageRegistry.formats[extension] || 0) + 1;

    });

}

/* ==========================================================
   OPTIMIZATION RECOMMENDATIONS
========================================================== */

function generateRecommendations() {

    imageRegistry.recommendations = [];

    if (

        statistics.missingAlt > 0

    ) {

        imageRegistry.recommendations.push(

            "Add descriptive alt text to all images."

        );

    }

    if (

        statistics.lazyImages <

        statistics.totalImages

    ) {

        imageRegistry.recommendations.push(

            "Enable lazy loading for offscreen images."

        );

    }

    if (

        statistics.largeImages > 0

    ) {

        imageRegistry.recommendations.push(

            "Resize oversized images."

        );

    }

    if (

        imageRegistry.formats.png >

        0

    ) {

        imageRegistry.recommendations.push(

            "Convert PNG images to WebP or AVIF where appropriate."

        );

    }

    if (

        statistics.responsiveImages <

        statistics.totalImages

    ) {

        imageRegistry.recommendations.push(

            "Use srcset and sizes for responsive images."

        );

    }

}

/* ==========================================================
   SCORE CALCULATION
========================================================== */

function calculateScore() {

    let score = 100;

    score -=

        statistics.missingAlt * 5;

    score -=

        statistics.largeImages * 4;

    score -=

        (

            statistics.totalImages -

            statistics.lazyImages

        );

    score -=

        (

            statistics.totalImages -

            statistics.responsiveImages

        );

    statistics.score =

        Math.max(

            0,

            score

        );

}

/* ==========================================================
   MAIN ANALYSIS
========================================================== */

function run() {

    discoverImages();

    analyzeAltText();

    analyzeLazyLoading();

    analyzeResponsiveImages();

    analyzeImageDimensions();

    analyzeFormats();

    generateRecommendations();

    calculateScore();

    statistics.optimizedImages =

        statistics.totalImages -

        statistics.largeImages;

    return {

        success: true,

        timestamp: Date.now(),

        statistics,

        recommendations:

            imageRegistry.recommendations,

        formats:

            imageRegistry.formats

    };

}

/* ==========================================================
   VALIDATION
========================================================== */

function validate() {

    const issues = [];

    if (

        statistics.totalImages === 0

    ) {

        issues.push(

            "No images detected."

        );

    }

    return {

        valid:

            issues.length === 0,

        issues

    };

}

/* ==========================================================
   REPORT
========================================================== */

function report() {

    const validation =

        validate();

    console.group(

        ENGINE_NAME

    );

    console.log(

        "Images:",

        statistics.totalImages

    );

    console.log(

        "Optimized:",

        statistics.optimizedImages

    );

    console.log(

        "Lazy Loaded:",

        statistics.lazyImages

    );

    console.log(

        "Responsive:",

        statistics.responsiveImages

    );

    console.log(

        "Missing Alt:",

        statistics.missingAlt

    );

    console.log(

        "Large Images:",

        statistics.largeImages

    );

    console.log(

        "Formats:",

        imageRegistry.formats

    );

    console.log(

        "Recommendations:",

        imageRegistry.recommendations.length

    );

    console.log(

        "Score:",

        statistics.score + "%"

    );

    console.log(

        "----------------------------------------"

    );

    if (

        validation.valid

    ) {

        console.log(

            "%cSTATUS: IMAGE OPTIMIZER READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: WARNINGS"

        );

        validation.issues.forEach(function (

            issue

        ) {

            console.warn(

                "•",

                issue

            );

        });

    }

    console.groupEnd();

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneImageOptimizer =

Object.freeze({

    discoverImages,

    analyzeAltText,

    analyzeLazyLoading,

    analyzeResponsiveImages,

    analyzeImageDimensions,

    analyzeFormats,

    generateRecommendations,

    calculateScore,

    run,

    validate,

    report,

    info

});

/* ==========================================================
   ENGINE INITIALIZATION
========================================================== */

console.info(

    "%c" +

    ENGINE_NAME +

    " v" +

    ENGINE_VERSION +

    " initialized",

    "color:#22c55e;font-weight:bold;"

);

})();