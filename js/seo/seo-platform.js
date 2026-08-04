/*!
 * ==========================================================
 * ToolXone SEO Platform
 * ----------------------------------------------------------
 * Unified SEO platform orchestrating all SEO engines.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";

/* ==========================================================
   PLATFORM INFORMATION
========================================================== */

const PLATFORM_NAME =
    "ToolXone SEO Platform";

const PLATFORM_VERSION =
    "1.0.0";

/* ==========================================================
   REGISTERED ENGINES
========================================================== */

const engines = [

    {

        name:
            "Schema Engine",

        object:
            "ToolXoneSchema"

    },

    {

        name:
            "Meta Engine",

        object:
            "ToolXoneMeta"

    },

    {

        name:
            "SEO Validator",

        object:
            "ToolXoneSEOValidator"

    },

    {

        name:
            "Rich Results Validator",

        object:
            "ToolXoneRichResultsValidator"

    },

    {

        name:
            "Sitemap Engine",

        object:
            "ToolXoneSitemap"

    },

    {

        name:
            "Robots Engine",

        object:
            "ToolXoneRobots"

    }

];

/* ==========================================================
   RESULT MODEL
========================================================== */

function createResult() {

    return {

        passed: 0,

        failed: 0,

        total:

            engines.length,

        engines: []

    };

}

/* ==========================================================
   PLATFORM INFORMATION
========================================================== */

function info() {

    return {

        name:
            PLATFORM_NAME,

        version:
            PLATFORM_VERSION,

        engines:

            engines.map(

                engine =>

                    engine.name

            )

    };

}

/* ==========================================================
   ENGINE DETECTION
========================================================== */

function detectEngines() {

    return engines.map(

        engine => ({

            name:

                engine.name,

            object:

                engine.object,

            loaded:

                typeof window[

                    engine.object

                ] !== "undefined"

        })

    );

}

/* ==========================================================
   PLATFORM HEALTH
========================================================== */

function checkHealth() {

    const result =

        createResult();

    detectEngines()

        .forEach(engine => {

            result.engines.push(

                engine

            );

            if (

                engine.loaded

            ) {

                result.passed++;

            }

            else {

                result.failed++;

            }

        });

    return result;

}

/* ==========================================================
   PLATFORM STATUS
========================================================== */

function status() {

    const health =

        checkHealth();

    return {

        platform:

            PLATFORM_NAME,

        version:

            PLATFORM_VERSION,

        total:

            health.total,

        loaded:

            health.passed,

        missing:

            health.failed,

        healthy:

            health.failed === 0

    };

}

/* ==========================================================
   PLATFORM RUNNER
========================================================== */

function run() {

    const health =

        checkHealth();

    const report =

        {

            platform:

                PLATFORM_NAME,

            version:

                PLATFORM_VERSION,

            timestamp:

                new Date().toISOString(),

            total:

                health.total,

            passed:

                health.passed,

            failed:

                health.failed,

            engines: []

        };

    health.engines.forEach(

        engine => {

            report.engines.push({

                name:

                    engine.name,

                loaded:

                    engine.loaded

            });

        }

    );

    report.score =

        calculateScore(

            report

        );

    report.ready =

        report.failed === 0;

    return report;

}

/* ==========================================================
   SCORE CALCULATOR
========================================================== */

function calculateScore(
    report
) {

    if (

        report.total === 0

    ) {

        return 0;

    }

    return Math.round(

        (

            report.passed /

            report.total

        ) * 100

    );

}

/* ==========================================================
   READY CHECK
========================================================== */

function isReady() {

    return run().ready;

}

/* ==========================================================
   CONSOLE DASHBOARD
========================================================== */

function report(
    result
) {

    console.group(

        PLATFORM_NAME

    );

    console.log(

        "Version:",

        PLATFORM_VERSION

    );

    console.log(

        "Timestamp:",

        result.timestamp

    );

    console.log(

        "----------------------------------------"

    );

    result.engines.forEach(

        engine => {

            if (

                engine.loaded

            ) {

                console.log(

                    "✅",

                    engine.name

                );

            }

            else {

                console.warn(

                    "❌",

                    engine.name

                );

            }

        }

    );

    console.log(

        "----------------------------------------"

    );

    console.log(

        "Loaded Engines:",

        result.passed,

        "/",

        result.total

    );

    console.log(

        "SEO Score:",

        result.score + "%"

    );

    if (

        result.ready

    ) {

        console.log(

            "%cSTATUS: GOOGLE READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: PLATFORM INCOMPLETE"

        );

    }

    console.groupEnd();

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneSEO = Object.freeze({

    info,

    detectEngines,

    checkHealth,

    status,

    run,

    report,

    isReady

});

/* ==========================================================
   INITIALIZATION
========================================================== */

console.info(

    "%c" +

    PLATFORM_NAME +

    " v" +

    PLATFORM_VERSION +

    " initialized",

    "color:#2563eb;font-weight:bold;"

);

})();