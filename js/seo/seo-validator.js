/*!
 * ==========================================================
 * ToolXone SEO Validator
 * ----------------------------------------------------------
 * Validates SEO implementation for ToolXone pages.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

const ENGINE_NAME =
    "ToolXone SEO Validator";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    stopOnError: false,

    includeWarnings: true,

    includeInfo: true

});

/* ==========================================================
   VALIDATION RESULT
========================================================== */

function createResult() {

    return {

        passed: 0,

        failed: 0,

        warnings: 0,

        info: 0,

        score: 100,

        checks: []

    };

}

/* ==========================================================
   RESULT HELPERS
========================================================== */

function pass(
    result,
    message
) {

    result.passed++;

    result.checks.push({

        status: "PASS",

        message

    });

}

function fail(
    result,
    message
) {

    result.failed++;

    result.checks.push({

        status: "FAIL",

        message

    });

}

function warn(
    result,
    message
) {

    result.warnings++;

    result.checks.push({

        status: "WARNING",

        message

    });

}

function info(
    result,
    message
) {

    result.info++;

    result.checks.push({

        status: "INFO",

        message

    });

}

/* ==========================================================
   DOM HELPERS
========================================================== */

function findMeta(selector) {

    return document.head.querySelector(
        selector
    );

}

function findSchema() {

    return document.head.querySelectorAll(

        'script[type="application/ld+json"]'

    );

}

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

function engineInfo() {

    return {

        name:
            ENGINE_NAME,

        version:
            ENGINE_VERSION,

        validators: [

            "Title",

            "Description",

            "Keywords",

            "Canonical",

            "Robots",

            "Open Graph",

            "Twitter",

            "Schema"

        ]

    };

}

/* ==========================================================
   TITLE VALIDATION
========================================================== */

function validateTitle(result) {

    const title =
        document.title.trim();

    if (title.length > 0) {

        pass(
            result,
            "Title is present."
        );

    } else {

        fail(
            result,
            "Missing page title."
        );

    }

}

/* ==========================================================
   DESCRIPTION VALIDATION
========================================================== */

function validateDescription(result) {

    const element = findMeta(
        'meta[name="description"]'
    );

    if (
        element &&
        element.content.trim().length > 0
    ) {

        pass(
            result,
            "Meta description is present."
        );

    } else {

        fail(
            result,
            "Missing meta description."
        );

    }

}

/* ==========================================================
   KEYWORDS VALIDATION
========================================================== */

function validateKeywords(result) {

    const element = findMeta(
        'meta[name="keywords"]'
    );

    if (
        element &&
        element.content.trim().length > 0
    ) {

        pass(
            result,
            "Keywords meta tag is present."
        );

    } else {

        warn(
            result,
            "Keywords meta tag is missing."
        );

    }

}

/* ==========================================================
   CANONICAL VALIDATION
========================================================== */

function validateCanonical(result) {

    const canonical =
        document.head.querySelector(
            'link[rel="canonical"]'
        );

    if (
        canonical &&
        canonical.href.trim().length > 0
    ) {

        pass(
            result,
            "Canonical URL is present."
        );

    } else {

        fail(
            result,
            "Missing canonical URL."
        );

    }

}

/* ==========================================================
   ROBOTS VALIDATION
========================================================== */

function validateRobots(result) {

    const robots = findMeta(
        'meta[name="robots"]'
    );

    if (
        robots &&
        robots.content.trim().length > 0
    ) {

        pass(
            result,
            "Robots meta tag is present."
        );

    } else {

        warn(
            result,
            "Robots meta tag is missing."
        );

    }

}

/* ==========================================================
   OPEN GRAPH VALIDATION
========================================================== */

function validateOpenGraph(result) {

    const required = [

        "title",

        "description",

        "type",

        "url",

        "image"

    ];

    let missing = 0;

    required.forEach(tag => {

        const element = findMeta(

            `meta[property="og:${tag}"]`

        );

        if (

            element &&

            element.content.trim().length > 0

        ) {

            pass(

                result,

                `Open Graph "${tag}" is present.`

            );

        }

        else {

            missing++;

        }

    });

    if (missing > 0) {

        warn(

            result,

            `${missing} Open Graph tag(s) missing.`

        );

    }

}

/* ==========================================================
   TWITTER VALIDATION
========================================================== */

function validateTwitter(result) {

    const required = [

        "card",

        "title",

        "description",

        "image"

    ];

    let missing = 0;

    required.forEach(tag => {

        const element = findMeta(

            `meta[name="twitter:${tag}"]`

        );

        if (

            element &&

            element.content.trim().length > 0

        ) {

            pass(

                result,

                `Twitter "${tag}" is present.`

            );

        }

        else {

            missing++;

        }

    });

    if (missing > 0) {

        warn(

            result,

            `${missing} Twitter tag(s) missing.`

        );

    }

}

/* ==========================================================
   STRUCTURED DATA VALIDATION
========================================================== */

function validateStructuredData(result) {

    const schemas =

        findSchema();

    if (

        schemas.length === 0

    ) {

        fail(

            result,

            "No JSON-LD schema found."

        );

        return;

    }

    pass(

        result,

        `${schemas.length} JSON-LD schema block(s) found.`

    );

}

/* ==========================================================
   VALIDATION PIPELINE
========================================================== */

function run(
    options = {}
) {

    const settings = {

        ...DEFAULT_OPTIONS,

        ...options

    };

    void settings;

    const result =
        createResult();

    validateTitle(result);

    validateDescription(result);

    validateKeywords(result);

    validateCanonical(result);

    validateRobots(result);

    validateOpenGraph(result);

    validateTwitter(result);

    validateStructuredData(result);

    const totalChecks =

        result.passed +

        result.failed +

        result.warnings;

    if (totalChecks > 0) {

        result.score = Math.max(

            0,

            Math.round(

                (result.passed / totalChecks) * 100

            )

        );

    }

    return result;

}

/* ==========================================================
   CONSOLE REPORT
========================================================== */

function report(
    result
) {

    console.group(

        ENGINE_NAME

    );

    result.checks.forEach(

        check => {

            switch (check.status) {

                case "PASS":

                    console.log(

                        "✅",

                        check.message

                    );

                    break;

                case "FAIL":

                    console.error(

                        "❌",

                        check.message

                    );

                    break;

                case "WARNING":

                    console.warn(

                        "⚠️",

                        check.message

                    );

                    break;

                case "INFO":

                    console.info(

                        "ℹ️",

                        check.message

                    );

                    break;

            }

        }

    );

    console.log(

        "----------------------------------------"

    );

    console.log(

        "Passed:",

        result.passed

    );

    console.log(

        "Failed:",

        result.failed

    );

    console.log(

        "Warnings:",

        result.warnings

    );

    console.log(

        "SEO Score:",

        result.score + "%"

    );

    console.groupEnd();

}

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

function info() {

    return {

        name:
            ENGINE_NAME,

        version:
            ENGINE_VERSION,

        validators: [

            "Title",

            "Description",

            "Keywords",

            "Canonical",

            "Robots",

            "Open Graph",

            "Twitter",

            "Structured Data"

        ]

    };

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneSEOValidator = Object.freeze({

    run,

    report,

    info

});

console.info(

    "%c" +

    ENGINE_NAME +

    " v" +

    ENGINE_VERSION +

    " initialized",

    "color:#16a34a;font-weight:bold;"

);

})();