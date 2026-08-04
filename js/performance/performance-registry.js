/*!
 * ==========================================================
 * ToolXone Performance Registry
 * ----------------------------------------------------------
 * Central registry for all ToolXone performance modules,
 * metrics, thresholds and configuration.
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
    "ToolXone Performance Registry";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    debug: false,

    autoRegister: true,

    enableMetrics: true,

    enableThresholds: true

});

/* ==========================================================
   REGISTRY STORAGE
========================================================== */

const modules = new Map();

const metrics = new Map();

const thresholds = new Map();

/* ==========================================================
   RESULT MODEL
========================================================== */

function createResult() {

    return {

        success: true,

        modules: 0,

        metrics: 0,

        thresholds: 0

    };

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

        configuration:

            DEFAULT_OPTIONS

    };

}

/* ==========================================================
   MODULE REGISTRATION
========================================================== */

function registerModule(

    name,

    module

) {

    if (

        !name ||

        !module

    ) {

        return false;

    }

    if (

        modules.has(

            name

        )

    ) {

        return false;

    }

    modules.set(

        name,

        module

    );

    return true;

}

/* ==========================================================
   METRIC REGISTRATION
========================================================== */

function registerMetric(

    name,

    value

) {

    if (

        !name

    ) {

        return false;

    }

    metrics.set(

        name,

        value

    );

    return true;

}

/* ==========================================================
   THRESHOLD REGISTRATION
========================================================== */

function registerThreshold(

    name,

    value

) {

    if (

        !name

    ) {

        return false;

    }

    thresholds.set(

        name,

        value

    );

    return true;

}

/* ==========================================================
   FINDERS
========================================================== */

function getModule(

    name

) {

    return modules.get(

        name

    ) || null;

}

function getMetric(

    name

) {

    return metrics.get(

        name

    ) ?? null;

}

function getThreshold(

    name

) {

    return thresholds.get(

        name

    ) ?? null;

}

/* ==========================================================
   REMOVERS
========================================================== */

function removeModule(

    name

) {

    return modules.delete(

        name

    );

}

function removeMetric(

    name

) {

    return metrics.delete(

        name

    );

}

function removeThreshold(

    name

) {

    return thresholds.delete(

        name

    );

}

/* ==========================================================
   REGISTRY STATISTICS
========================================================== */

function statistics() {

    return {

        modules:

            modules.size,

        metrics:

            metrics.size,

        thresholds:

            thresholds.size

    };

}

/* ==========================================================
   LIST REGISTRY CONTENT
========================================================== */

function getModules() {

    return Array.from(

        modules.entries()

    );

}

function getMetrics() {

    return Array.from(

        metrics.entries()

    );

}

function getThresholds() {

    return Array.from(

        thresholds.entries()

    );

}

/* ==========================================================
   RESET REGISTRY
========================================================== */

function reset() {

    modules.clear();

    metrics.clear();

    thresholds.clear();

}

/* ==========================================================
   REGISTRY VALIDATION
========================================================== */

function validate() {

    const issues = [];

    if (

        modules.size === 0

    ) {

        issues.push(

            "No performance modules registered."

        );

    }

    if (

        metrics.size === 0

    ) {

        issues.push(

            "No performance metrics registered."

        );

    }

    if (

        thresholds.size === 0

    ) {

        issues.push(

            "No performance thresholds registered."

        );

    }

    return {

        valid:

            issues.length === 0,

        issues

    };

}

/* ==========================================================
   REGISTRY REPORT
========================================================== */

function report() {

    const stats =

        statistics();

    const validation =

        validate();

    console.group(

        ENGINE_NAME

    );

    console.log(

        "Modules:",

        stats.modules

    );

    console.log(

        "Metrics:",

        stats.metrics

    );

    console.log(

        "Thresholds:",

        stats.thresholds

    );

    console.log(

        "----------------------------------------"

    );

    if (

        validation.valid

    ) {

        console.log(

            "%cSTATUS: REGISTRY READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: REGISTRY HAS WARNINGS"

        );

        validation.issues.forEach(issue =>

            console.warn(

                "•",

                issue

            )

        );

    }

    console.groupEnd();

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXonePerformanceRegistry = Object.freeze({

    registerModule,

    registerMetric,

    registerThreshold,

    getModule,

    getMetric,

    getThreshold,

    getModules,

    getMetrics,

    getThresholds,

    removeModule,

    removeMetric,

    removeThreshold,

    reset,

    statistics,

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

    "color:#f59e0b;font-weight:bold;"

);

})();