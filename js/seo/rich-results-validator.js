/*!
 * ==========================================================
 * ToolXone Rich Results Validator
 * ----------------------------------------------------------
 * Validates JSON-LD structured data and rich results
 * eligibility for ToolXone pages.
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
    "ToolXone Rich Results Validator";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    validateOrganization: true,

    validateWebsite: true,

    validateWebPage: true,

    validateSoftwareApplication: true,

    validateBreadcrumbs: true,

    validateFAQ: true,

    allowWarnings: true

});

/* ==========================================================
   VALIDATION RESULT
========================================================== */

function createResult() {

    return {

        score: 0,

        passed: 0,

        failed: 0,

        warnings: 0,

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

/* ==========================================================
   DOM HELPERS
========================================================== */

function findSchemas() {

    return Array.from(

        document.querySelectorAll(

            'script[type="application/ld+json"]'

        )

    );

}

function parseSchema(

    element

) {

    try {

        return JSON.parse(

            element.textContent

        );

    }

    catch (

        error

    ) {

        return null;

    }

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

        supportedSchemas: [

            "Organization",

            "WebSite",

            "WebPage",

            "SoftwareApplication",

            "BreadcrumbList",

            "FAQPage"

        ]

    };

}

/* ==========================================================
   JSON-LD VALIDATION
========================================================== */

function validateJsonLd(result) {

    const schemas = findSchemas();

    if (schemas.length === 0) {

        fail(

            result,

            "No JSON-LD blocks found."

        );

        return [];

    }

    pass(

        result,

        `${schemas.length} JSON-LD block(s) found.`

    );

    const parsedSchemas = [];

    schemas.forEach(element => {

        const schema = parseSchema(element);

        if (schema) {

            pass(

                result,

                "JSON-LD syntax is valid."

            );

            parsedSchemas.push(schema);

        }

        else {

            fail(

                result,

                "Invalid JSON-LD syntax."

            );

        }

    });

    return parsedSchemas;

}

/* ==========================================================
   CONTEXT VALIDATION
========================================================== */

function validateContext(

    result,

    schemas

) {

    schemas.forEach(schema => {

        if (

            schema["@context"] ===

            "https://schema.org"

        ) {

            pass(

                result,

                "@context is valid."

            );

        }

        else {

            fail(

                result,

                "Missing or invalid @context."

            );

        }

    });

}

/* ==========================================================
   TYPE VALIDATION
========================================================== */

function validateType(

    result,

    schemas

) {

    schemas.forEach(schema => {

        if (

            schema["@type"]

        ) {

            pass(

                result,

                `Schema type detected: ${schema["@type"]}`

            );

        }

        else {

            fail(

                result,

                "Schema missing @type."

            );

        }

    });

}

/* ==========================================================
   SCHEMA INVENTORY
========================================================== */

function collectSchemaTypes(

    schemas

) {

    return schemas

        .map(

            schema => schema["@type"]

        )

        .filter(Boolean);

}

/* ==========================================================
   ORGANIZATION VALIDATOR
========================================================== */

function validateOrganization(
    result,
    schema
) {

    if (schema.name && schema.url) {

        pass(
            result,
            "Organization schema is valid."
        );

    } else {

        fail(
            result,
            "Organization schema is incomplete."
        );

    }

}

/* ==========================================================
   WEBSITE VALIDATOR
========================================================== */

function validateWebSite(
    result,
    schema
) {

    if (schema.name && schema.url) {

        pass(
            result,
            "WebSite schema is valid."
        );

    } else {

        fail(
            result,
            "WebSite schema is incomplete."
        );

    }

}

/* ==========================================================
   WEBPAGE VALIDATOR
========================================================== */

function validateWebPage(
    result,
    schema
) {

    if (

        schema.name &&
        schema.url &&
        schema.description

    ) {

        pass(
            result,
            "WebPage schema is valid."
        );

    } else {

        fail(
            result,
            "WebPage schema is incomplete."
        );

    }

}

/* ==========================================================
   SOFTWARE APPLICATION VALIDATOR
========================================================== */

function validateSoftwareApplication(
    result,
    schema
) {

    if (

        schema.name &&
        schema.applicationCategory

    ) {

        pass(
            result,
            "SoftwareApplication schema is valid."
        );

    } else {

        fail(
            result,
            "SoftwareApplication schema is incomplete."
        );

    }

}

/* ==========================================================
   BREADCRUMB VALIDATOR
========================================================== */

function validateBreadcrumbList(
    result,
    schema
) {

    if (

        Array.isArray(
            schema.itemListElement
        ) &&

        schema.itemListElement.length > 0

    ) {

        pass(
            result,
            "BreadcrumbList schema is valid."
        );

    } else {

        fail(
            result,
            "BreadcrumbList schema is incomplete."
        );

    }

}

/* ==========================================================
   FAQ VALIDATOR
========================================================== */

function validateFAQPage(
    result,
    schema
) {

    if (

        Array.isArray(
            schema.mainEntity
        ) &&

        schema.mainEntity.length > 0

    ) {

        pass(
            result,
            "FAQPage schema is valid."
        );

    } else {

        fail(
            result,
            "FAQPage schema is incomplete."
        );

    }

}

/* ==========================================================
   SCHEMA VALIDATOR REGISTRY
========================================================== */

const SCHEMA_VALIDATORS = Object.freeze({

    Organization:
        validateOrganization,

    WebSite:
        validateWebSite,

    WebPage:
        validateWebPage,

    SoftwareApplication:
        validateSoftwareApplication,

    BreadcrumbList:
        validateBreadcrumbList,

    FAQPage:
        validateFAQPage

});

/* ==========================================================
   SCHEMA DISPATCHER
========================================================== */

function validateSchemas(
    result,
    schemas
) {

    schemas.forEach(schema => {

        const validator =

            SCHEMA_VALIDATORS[
                schema["@type"]
            ];

        if (validator) {

            validator(
                result,
                schema
            );

        }

        else {

            warn(
                result,
                `No validator registered for "${schema["@type"]}".`
            );

        }

    });

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

    const schemas =
        validateJsonLd(result);

    validateContext(
        result,
        schemas
    );

    validateType(
        result,
        schemas
    );

    validateSchemas(
        result,
        schemas
    );

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

    result.checks.forEach(check => {

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

        }

    });

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
        "Rich Results Score:",
        result.score + "%"
    );

    console.log(
        "----------------------------------------"
    );

    if (result.failed === 0) {

        console.log(

            "%cSTATUS: RICH RESULTS PASSED",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.error(
            "STATUS: RICH RESULTS FAILED"
        );

    }

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

        supportedSchemas: [

            "Organization",

            "WebSite",

            "WebPage",

            "SoftwareApplication",

            "BreadcrumbList",

            "FAQPage"

        ]

    };

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneRichResultsValidator =

    Object.freeze({

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

    "color:#9333ea;font-weight:bold;"

);

})();