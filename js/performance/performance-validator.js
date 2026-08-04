/*!
 * ============================================================
 * ToolXone Performance Validator
 * ------------------------------------------------------------
 * Validates Performance Platform modules, metrics,
 * configuration and health.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ============================================================
 */

(function () {

"use strict";

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

const ENGINE_NAME =

    "ToolXone Performance Validator";

const ENGINE_VERSION =

    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const configuration = Object.freeze({

    enabled: true,

    debug: false,

    validateModules: true,

    validateMetrics: true,

    validateScores: true,

    validateConfiguration: true,

    strictMode: false

});

/* ==========================================================
   VALIDATION STORAGE
========================================================== */

const validationResults = [];

const warnings = [];

const errors = [];

const inspectedModules = [];

const inspectedMetrics = [];

/* ==========================================================
   VALIDATION STATISTICS
========================================================== */

const statistics = {

    modulesChecked: 0,

    metricsChecked: 0,

    passed: 0,

    failed: 0,

    warnings: 0,

    score: 100

};

/* ==========================================================
   RESULT MODEL
========================================================== */

function createResult() {

    return {

        success: true,

        timestamp: Date.now(),

        results: [],

        statistics: {}

    };

}

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
   PLACEHOLDER FUNCTIONS
========================================================== */

function run() {}

function report() {}

function validateModule() {}

function validateMetric() {}

function validateConfiguration() {}

function getStatistics() {}

function getWarnings() {}

function getErrors() {}

function reset() {}

/* ==========================================================
   MODULE VALIDATION
========================================================== */

function validateModule(

    name,

    module

) {

    const result = {

        name,

        available:

            typeof module !==

            "undefined",

        passed: true,

        issues: []

    };

    if (

        typeof module ===

        "undefined"

    ) {

        result.passed = false;

        result.issues.push(

            "Module not found."

        );

    }

    else {

        if (

            typeof module.info !==

            "function"

        ) {

            result.passed = false;

            result.issues.push(

                "Missing info()"

            );

        }

        if (

            typeof module.run !==

            "function"

        ) {

            result.passed = false;

            result.issues.push(

                "Missing run()"

            );

        }

        if (

            typeof module.report !==

            "function"

        ) {

            result.passed = false;

            result.issues.push(

                "Missing report()"

            );

        }

    }

    inspectedModules.push(

        result

    );

    validationResults.push(

        result

    );

    statistics.modulesChecked++;

    if (

        result.passed

    ) {

        statistics.passed++;

    }

    else {

        statistics.failed++;

        errors.push(

            ...result.issues

        );

    }

    return result;

}

/* ==========================================================
   VALIDATE PERFORMANCE MODULES
========================================================== */

function validateModules() {

    validateModule(

        "Performance Engine",

        window.ToolXonePerformanceEngine

    );

    validateModule(

        "Core Web Vitals",

        window.ToolXoneCoreWebVitals

    );

    validateModule(

        "Lazy Loader",

        window.ToolXoneLazyLoader

    );

    validateModule(

        "Asset Optimizer",

        window.ToolXoneAssetOptimizer

    );

    validateModule(

        "Image Optimizer",

        window.ToolXoneImageOptimizer

    );

    return inspectedModules;

}

/* ==========================================================
   METRIC VALIDATION
========================================================== */

function validateMetric(

    name,

    value,

    minimum = 0

) {

    const result = {

        name,

        value,

        passed:

            value >= minimum

    };

    inspectedMetrics.push(

        result

    );

    validationResults.push(

        result

    );

    statistics.metricsChecked++;

    if (

        result.passed

    ) {

        statistics.passed++;

    }

    else {

        statistics.failed++;

        warnings.push(

            name +

            " below expected value."

        );

    }

    return result;

}

/* ==========================================================
   CONFIGURATION VALIDATION
========================================================== */

function validateConfiguration(

    module,

    name

) {

    if (

        !module ||

        typeof module.info !==

        "function"

    ) {

        return false;

    }

    const information =

        module.info();

    if (

        !information.configuration

    ) {

        warnings.push(

            name +

            " configuration missing."

        );

        statistics.warnings++;

        return false;

    }

    return true;

}

/* ==========================================================
   HEALTH SCORE
========================================================== */

function calculateHealthScore() {

    const total =

        statistics.passed +

        statistics.failed;

    if (

        total === 0

    ) {

        statistics.score = 100;

        return;

    }

    statistics.score =

        Math.round(

            (

                statistics.passed /

                total

            ) * 100

        );

}

/* ==========================================================
   PERFORMANCE HEALTH
========================================================== */

function validateHealth() {

    validateConfiguration(

        window.ToolXonePerformanceEngine,

        "Performance Engine"

    );

    validateConfiguration(

        window.ToolXoneCoreWebVitals,

        "Core Web Vitals"

    );

    validateConfiguration(

        window.ToolXoneLazyLoader,

        "Lazy Loader"

    );

    validateConfiguration(

        window.ToolXoneAssetOptimizer,

        "Asset Optimizer"

    );

    validateConfiguration(

        window.ToolXoneImageOptimizer,

        "Image Optimizer"

    );

    calculateHealthScore();

}

/* ==========================================================
   RUNNER
========================================================== */

function run() {

    reset();

    validateModules();

    validateHealth();

    return createResult();

}

/* ==========================================================
   REPORT
========================================================== */

function report() {

    console.group(

        ENGINE_NAME

    );

    console.log(

        "Modules Checked:",

        statistics.modulesChecked

    );

    console.log(

        "Metrics Checked:",

        statistics.metricsChecked

    );

    console.log(

        "Passed:",

        statistics.passed

    );

    console.log(

        "Failed:",

        statistics.failed

    );

    console.log(

        "Warnings:",

        warnings.length

    );

    console.log(

        "Health Score:",

        statistics.score +

        "%"

    );

    console.log(

        "----------------------------------------"

    );

    if (

        statistics.failed === 0

    ) {

        console.log(

            "%cSTATUS: PERFORMANCE VERIFIED",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: VALIDATION WARNINGS"

        );

    }

    console.groupEnd();

}

/* ==========================================================
   ACCESSORS
========================================================== */

function getStatistics() {

    return statistics;

}

function getWarnings() {

    return warnings;

}

function getErrors() {

    return errors;

}

/* ==========================================================
   RESET
========================================================== */

function reset() {

    validationResults.length = 0;

    warnings.length = 0;

    errors.length = 0;

    inspectedModules.length = 0;

    inspectedMetrics.length = 0;

    statistics.modulesChecked = 0;

    statistics.metricsChecked = 0;

    statistics.passed = 0;

    statistics.failed = 0;

    statistics.warnings = 0;

    statistics.score = 100;

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXonePerformanceValidator =

Object.freeze({

    info,

    run,

    report,

    validateModule,

    validateModules,

    validateMetric,

    validateConfiguration,

    validateHealth,

    getStatistics,

    getWarnings,

    getErrors,

    reset

});

/* ==========================================================
   INITIALIZATION
========================================================== */

console.info(

    "%c" +

    ENGINE_NAME +

    " v" +

    ENGINE_VERSION +

    " initialized",

    "color:#0ea5e9;font-weight:bold;"

);

})();