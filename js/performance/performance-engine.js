/*!
 * ==========================================================
 * ToolXone Performance Engine
 * ----------------------------------------------------------
 * Collects runtime performance metrics using the
 * browser Performance API.
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
    "ToolXone Performance Engine";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    enabled: true,

    debug: false,

    collectNavigation: true,

    collectResources: true,

    collectMemory: true

});

/* ==========================================================
   PERFORMANCE STORAGE
========================================================== */

const performanceData = {

    navigation: null,

    resources: [],

    memory: null,

    summary: {}

};

/* ==========================================================
   RESULT MODEL
========================================================== */

function createResult() {

    return {

        success: true,

        timestamp:

            Date.now(),

        metrics: {}

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
   NAVIGATION TIMING
========================================================== */

function getNavigationTiming() {

    if (

        !performance ||

        !performance.getEntriesByType

    ) {

        return null;

    }

    const navigation =

        performance.getEntriesByType(

            "navigation"

        )[0];

    if (

        !navigation

    ) {

        return null;

    }

    performanceData.navigation = {

        pageLoad:

            navigation.loadEventEnd,

        domContentLoaded:

            navigation.domContentLoadedEventEnd,

        domInteractive:

            navigation.domInteractive,

        redirectTime:

            navigation.redirectEnd -

            navigation.redirectStart,

        dnsLookup:

            navigation.domainLookupEnd -

            navigation.domainLookupStart,

        tcpConnection:

            navigation.connectEnd -

            navigation.connectStart,

        requestTime:

            navigation.responseEnd -

            navigation.requestStart,

        responseTime:

            navigation.responseEnd -

            navigation.responseStart,

        transferSize:

            navigation.transferSize,

        encodedBodySize:

            navigation.encodedBodySize,

        decodedBodySize:

            navigation.decodedBodySize

    };

    return performanceData.navigation;

}

/* ==========================================================
   PAGE LOAD SUMMARY
========================================================== */

function getPageSummary() {

    const navigation =

        getNavigationTiming();

    if (

        !navigation

    ) {

        return null;

    }

    performanceData.summary = {

        pageLoad:

            Math.round(

                navigation.pageLoad

            ),

        domReady:

            Math.round(

                navigation.domContentLoaded

            ),

        dns:

            Math.round(

                navigation.dnsLookup

            ),

        tcp:

            Math.round(

                navigation.tcpConnection

            ),

        request:

            Math.round(

                navigation.requestTime

            )

    };

    return performanceData.summary;

}

/* ==========================================================
   RESOURCE TIMING
========================================================== */

function getResourceTiming() {

    if (

        !performance ||

        !performance.getEntriesByType

    ) {

        return [];

    }

    const resources =

        performance.getEntriesByType(

            "resource"

        );

    performanceData.resources =

        resources.map(function (resource) {

            return {

                name:

                    resource.name,

                initiator:

                    resource.initiatorType,

                duration:

                    Math.round(

                        resource.duration

                    ),

                transferSize:

                    resource.transferSize || 0,

                encodedSize:

                    resource.encodedBodySize || 0,

                decodedSize:

                    resource.decodedBodySize || 0

            };

        });

    return performanceData.resources;

}

/* ==========================================================
   MEMORY INFORMATION
========================================================== */

function getMemoryUsage() {

    if (

        !performance ||

        !performance.memory

    ) {

        performanceData.memory = null;

        return null;

    }

    performanceData.memory = {

        used:

            performance.memory.usedJSHeapSize,

        total:

            performance.memory.totalJSHeapSize,

        limit:

            performance.memory.jsHeapSizeLimit

    };

    return performanceData.memory;

}

/* ==========================================================
   PERFORMANCE RUNNER
========================================================== */

function run() {

    const result =

        createResult();

    result.metrics.navigation =

        getNavigationTiming();

    result.metrics.summary =

        getPageSummary();

    result.metrics.resources =

        getResourceTiming();

    result.metrics.memory =

        getMemoryUsage();

    return result;

}

/* ==========================================================
   VALIDATION
========================================================== */

function validate() {

    const issues = [];

    if (

        !performanceData.navigation

    ) {

        issues.push(

            "Navigation timing not collected."

        );

    }

    if (

        performanceData.resources.length === 0

    ) {

        issues.push(

            "No resource timing collected."

        );

    }

    return {

        valid:

            issues.length === 0,

        issues

    };

}

/* ==========================================================
   STATISTICS
========================================================== */

function statistics() {

    return {

        resources:

            performanceData.resources.length,

        hasNavigation:

            performanceData.navigation !== null,

        hasMemory:

            performanceData.memory !== null

    };

}

/* ==========================================================
   CONSOLE REPORT
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

        "Resources:",

        stats.resources

    );

    console.log(

        "Navigation:",

        stats.hasNavigation

    );

    console.log(

        "Memory:",

        stats.hasMemory

    );

    console.log(

        "----------------------------------------"

    );

    if (

        validation.valid

    ) {

        console.log(

            "%cSTATUS: PERFORMANCE READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: PERFORMANCE HAS WARNINGS"

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

window.ToolXonePerformanceEngine = Object.freeze({

    getNavigationTiming,

    getPageSummary,

    getResourceTiming,

    getMemoryUsage,

    run,

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

    "color:#8b5cf6;font-weight:bold;"

);

})();