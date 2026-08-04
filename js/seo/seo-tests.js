/*!
 * ==========================================================
 * ToolXone SEO Tests
 * ----------------------------------------------------------
 * Automated QA suite for ToolXone SEO Platform.
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
    "ToolXone SEO Tests";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    autoRun: true,

    stopOnFailure: false,

    showPassed: true,

    showWarnings: true,

    showSummary: true

});

/* ==========================================================
   TEST RESULT
========================================================== */

function createResult() {

    return {

        total: 0,

        passed: 0,

        failed: 0,

        warnings: 0,

        tests: []

    };

}

/* ==========================================================
   TEST HELPERS
========================================================== */

function pass(

    result,

    message

) {

    result.total++;

    result.passed++;

    result.tests.push({

        status: "PASS",

        message

    });

}

function fail(

    result,

    message

) {

    result.total++;

    result.failed++;

    result.tests.push({

        status: "FAIL",

        message

    });

}

function warn(

    result,

    message

) {

    result.total++;

    result.warnings++;

    result.tests.push({

        status: "WARNING",

        message

    });

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

        purpose:
            "Automated QA for ToolXone SEO Platform"

    };

}

/* ==========================================================
   SCHEMA REGISTRY TEST
========================================================== */

function testSchemaRegistry(result) {

    if (

        typeof window.ToolXoneSchemaRegistry === "object"

    ) {

        pass(

            result,

            "Schema Registry loaded."

        );

    }

    else {

        fail(

            result,

            "Schema Registry not found."

        );

    }

}

/* ==========================================================
   SCHEMA ENGINE TEST
========================================================== */

function testSchemaEngine(result) {

    if (

        typeof window.ToolXoneSchema === "object"

    ) {

        pass(

            result,

            "Schema Engine loaded."

        );

    }

    else {

        fail(

            result,

            "Schema Engine not found."

        );

    }

}

/* ==========================================================
   META REGISTRY TEST
========================================================== */

function testMetaRegistry(result) {

    if (

        typeof window.ToolXoneMetaRegistry === "object"

    ) {

        pass(

            result,

            "Meta Registry loaded."

        );

    }

    else {

        fail(

            result,

            "Meta Registry not found."

        );

    }

}

/* ==========================================================
   META ENGINE TEST
========================================================== */

function testMetaEngine(result) {

    if (

        typeof window.ToolXoneMeta === "object"

    ) {

        pass(

            result,

            "Meta Engine loaded."

        );

    }

    else {

        fail(

            result,

            "Meta Engine not found."

        );

    }

}

/* ==========================================================
   SEO VALIDATOR TEST
========================================================== */

function testSEOValidator(result) {

    if (

        typeof window.ToolXoneSEOValidator === "object"

    ) {

        pass(

            result,

            "SEO Validator loaded."

        );

    }

    else {

        fail(

            result,

            "SEO Validator not found."

        );

    }

}

/* ==========================================================
   QA PIPELINE
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

    testSchemaRegistry(result);

    testSchemaEngine(result);

    testMetaRegistry(result);

    testMetaEngine(result);

    testSEOValidator(result);

    return result;

}

/* ==========================================================
   CONSOLE DASHBOARD
========================================================== */

function report(
    result
) {

    console.group(

        ENGINE_NAME

    );

    result.tests.forEach(

        test => {

            switch (

                test.status

            ) {

                case "PASS":

                    console.log(

                        "✅",

                        test.message

                    );

                    break;

                case "FAIL":

                    console.error(

                        "❌",

                        test.message

                    );

                    break;

                case "WARNING":

                    console.warn(

                        "⚠️",

                        test.message

                    );

                    break;

            }

        }

    );

    console.log(

        "----------------------------------------"

    );

    console.log(

        "Total:",

        result.total

    );

    console.log(

        "Passed:",

        result.passed

    );

    console.log(

        "Warnings:",

        result.warnings

    );

    console.log(

        "Failed:",

        result.failed

    );

    console.log(

        "----------------------------------------"

    );

    if (

        result.failed === 0

    ) {

        console.log(

            "%cSTATUS: SEO QA PASSED",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.error(

            "STATUS: SEO QA FAILED"

        );

    }

    console.groupEnd();

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneSEOTests = Object.freeze({

    run,

    report,

    info

});

/* ==========================================================
   DEVELOPMENT AUTO RUN
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (

            !DEFAULT_OPTIONS.autoRun

        ) {

            return;

        }

        if (

            typeof window.ToolXoneSEOValidator !==
            "object"

        ) {

            console.warn(

                "SEO Validator not available."

            );

            return;

        }

        const qaResult =
            run();

        report(
            qaResult
        );

        const seoResult =
            ToolXoneSEOValidator.run();

        ToolXoneSEOValidator.report(

            seoResult

        );

    }

);

/* ==========================================================
   ENGINE INFORMATION
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