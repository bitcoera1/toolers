(function () {

"use strict";

/* ==========================================================
   TOOLXONE ASSET OPTIMIZER
========================================================== */

const ENGINE_NAME =

    "ToolXone Asset Optimizer";

const ENGINE_VERSION =

    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const configuration = {

    enabled: true,

    debug: false,

    analyzeCSS: true,

    analyzeJS: true,

    analyzeImages: true,

    analyzeFonts: true,

    detectDuplicates: true,

    recommendations: true

};

/* ==========================================================
   STORAGE
========================================================== */

const assetRegistry = {

    css: [],

    javascript: [],

    images: [],

    fonts: [],

    duplicates: []

};

const optimizationSuggestions = [];

const statistics = {

    totalAssets: 0,

    optimizedAssets: 0,

    duplicateAssets: 0,

    score: 100

};

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

function info() {

    return {

        name: ENGINE_NAME,

        version: ENGINE_VERSION,

        configuration

    };

}

/* ==========================================================
   CSS ANALYZER
========================================================== */

function analyzeCSS() {

    assetRegistry.css =

        Array.from(

            document.styleSheets

        ).map(function (

            stylesheet

        ) {

            return {

                href:

                    stylesheet.href ||

                    "inline",

                disabled:

                    stylesheet.disabled,

                media:

                    stylesheet.media ?

                    stylesheet.media.mediaText :

                    "all"

            };

        });

    return assetRegistry.css;

}

/* ==========================================================
   JAVASCRIPT ANALYZER
========================================================== */

function analyzeJavaScript() {

    assetRegistry.javascript =

        Array.from(

            document.scripts

        ).map(function (

            script

        ) {

            return {

                src:

                    script.src ||

                    "inline",

                async:

                    script.async,

                defer:

                    script.defer,

                type:

                    script.type ||

                    "text/javascript"

            };

        });

    return assetRegistry.javascript;

}

/* ==========================================================
   UPDATE STATISTICS
========================================================== */

function updateStatistics() {

    statistics.totalAssets =

        assetRegistry.css.length +

        assetRegistry.javascript.length +

        assetRegistry.images.length +

        assetRegistry.fonts.length;

    return statistics;

}

/* ==========================================================
   IMAGE ANALYZER
========================================================== */

function analyzeImages() {

    assetRegistry.images =

        Array.from(

            document.images

        ).map(function (

            image

        ) {

            return {

                src:

                    image.currentSrc ||

                    image.src ||

                    "",

                loading:

                    image.loading ||

                    "eager",

                width:

                    image.naturalWidth,

                height:

                    image.naturalHeight,

                alt:

                    image.alt ||

                    ""

            };

        });

    return assetRegistry.images;

}

/* ==========================================================
   FONT ANALYZER
========================================================== */

function analyzeFonts() {

    assetRegistry.fonts = [];

    if (

        document.fonts

    ) {

        document.fonts.forEach(function (

            font

        ) {

            assetRegistry.fonts.push({

                family:

                    font.family,

                status:

                    font.status

            });

        });

    }

    return assetRegistry.fonts;

}

/* ==========================================================
   DUPLICATE DETECTOR
========================================================== */

function detectDuplicates() {

    assetRegistry.duplicates = [];

    const seen = new Set();

    [

        ...assetRegistry.css,

        ...assetRegistry.javascript

    ].forEach(function (

        asset

    ) {

        const key =

            asset.href ||

            asset.src;

        if (

            !key ||

            key === "inline"

        ) {

            return;

        }

        if (

            seen.has(key)

        ) {

            assetRegistry.duplicates.push(

                key

            );

        }

        else {

            seen.add(

                key

            );

        }

    });

    statistics.duplicateAssets =

        assetRegistry.duplicates.length;

    return assetRegistry.duplicates;

}

/* ==========================================================
   OPTIMIZATION SUGGESTIONS
========================================================== */

function generateSuggestions() {

    optimizationSuggestions.length = 0;

    if (

        assetRegistry.duplicates.length > 0

    ) {

        optimizationSuggestions.push(

            "Remove duplicate CSS/JavaScript assets."

        );

    }

    if (

        assetRegistry.images.some(

            image =>

            image.loading !== "lazy"

        )

    ) {

        optimizationSuggestions.push(

            "Enable lazy loading for non-critical images."

        );

    }

    if (

        assetRegistry.javascript.some(

            script =>

            !script.defer &&

            !script.async &&

            script.src !== "inline"

        )

    ) {

        optimizationSuggestions.push(

            "Consider deferring non-critical JavaScript."

        );

    }

    return optimizationSuggestions;

}

/* ==========================================================
   RUNNER
========================================================== */

function run() {

    analyzeCSS();

    analyzeJavaScript();

    analyzeImages();

    analyzeFonts();

    updateStatistics();

    detectDuplicates();

    generateSuggestions();

    statistics.optimizedAssets =

        statistics.totalAssets -

        statistics.duplicateAssets;

    statistics.score = Math.max(

        0,

        100 -

        (statistics.duplicateAssets * 5)

    );

    return statistics;

}

/* ==========================================================
   VALIDATION
========================================================== */

function validate() {

    const issues = [];

    if (

        statistics.totalAssets === 0

    ) {

        issues.push(

            "No assets detected."

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

        "CSS:",

        assetRegistry.css.length

    );

    console.log(

        "JavaScript:",

        assetRegistry.javascript.length

    );

    console.log(

        "Images:",

        assetRegistry.images.length

    );

    console.log(

        "Fonts:",

        assetRegistry.fonts.length

    );

    console.log(

        "Duplicates:",

        assetRegistry.duplicates.length

    );

    console.log(

        "Score:",

        statistics.score +

        "%"

    );

    console.log(

        "Suggestions:",

        optimizationSuggestions.length

    );

    console.log(

        "----------------------------------------"

    );

    if (

        validation.valid

    ) {

        console.log(

            "%cSTATUS: ASSET OPTIMIZER READY",

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

window.ToolXoneAssetOptimizer = Object.freeze({

    analyzeCSS,

    analyzeJavaScript,

    analyzeImages,

    analyzeFonts,

    detectDuplicates,

    generateSuggestions,

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

    "color:#2563eb;font-weight:bold;"

);

})();