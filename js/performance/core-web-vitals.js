/*!
 * ==========================================================
 * ToolXone Core Web Vitals Engine
 * ----------------------------------------------------------
 * Collects and manages Core Web Vitals metrics for
 * performance monitoring.
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

    "ToolXone Core Web Vitals";

const ENGINE_VERSION =

    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    enabled: true,

    debug: false,

    observeContinuously: true,

    collectHistory: true

});

/* ==========================================================
   VITALS STORAGE
========================================================== */

const vitals = {

    lcp: null,

    cls: null,

    inp: null,

    fcp: null,

    ttfb: null

};

/* ==========================================================
   RESULT MODEL
========================================================== */

function createResult() {

    return {

        success: true,

        timestamp: Date.now(),

        vitals: {}

    };

}

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

function info() {

    return {

        name: ENGINE_NAME,

        version: ENGINE_VERSION,

        configuration: DEFAULT_OPTIONS

    };

}

/* ==========================================================
   LARGEST CONTENTFUL PAINT
========================================================== */

function getLCP() {

    if (

        !performance ||

        !performance.getEntriesByType

    ) {

        return null;

    }

    const entries =

        performance.getEntriesByType(

            "largest-contentful-paint"

        );

    if (

        entries.length === 0

    ) {

        return null;

    }

    const latest =

        entries[

            entries.length - 1

        ];

    vitals.lcp = {

        value:

            Math.round(

                latest.startTime

            ),

        element:

            latest.element || null

    };

    return vitals.lcp;

}

/* ==========================================================
   FIRST CONTENTFUL PAINT
========================================================== */

function getFCP() {

    if (

        !performance ||

        !performance.getEntriesByType

    ) {

        return null;

    }

    const paints =

        performance.getEntriesByType(

            "paint"

        );

    const fcp =

        paints.find(function (entry) {

            return (

                entry.name ===

                "first-contentful-paint"

            );

        });

    if (

        !fcp

    ) {

        return null;

    }

    vitals.fcp = {

        value:

            Math.round(

                fcp.startTime

            )

    };

    return vitals.fcp;

}

/* ==========================================================
   TIME TO FIRST BYTE
========================================================== */

function getTTFB() {

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

    vitals.ttfb = {

        value:

            Math.round(

                navigation.responseStart

            )

    };

    return vitals.ttfb;

}

/* ==========================================================
   PERFORMANCE OBSERVERS
========================================================== */

const observers = {

    lcp: null,

    cls: null,

    inp: null

};

/* ==========================================================
   START OBSERVERS
========================================================== */

function startObservers() {

    if (

        typeof PerformanceObserver ===

        "undefined"

    ) {

        return false;

    }

    /* ---------- LCP ---------- */

    try {

        observers.lcp =

            new PerformanceObserver(

                function (list) {

                    const entries =

                        list.getEntries();

                    const latest =

                        entries[

                            entries.length - 1

                        ];

                    vitals.lcp = {

                        value:

                            Math.round(

                                latest.startTime

                            )

                    };

                }

            );

        observers.lcp.observe({

            type:

                "largest-contentful-paint",

            buffered: true

        });

    }

    catch (error) {}

    /* ---------- CLS ---------- */

    try {

        let clsValue = 0;

        observers.cls =

            new PerformanceObserver(

                function (list) {

                    list.getEntries().forEach(

                        function (entry) {

                            if (

                                !entry.hadRecentInput

                            ) {

                                clsValue +=

                                    entry.value;

                            }

                        }

                    );

                    vitals.cls = {

                        value:

                            Number(

                                clsValue.toFixed(3)

                            )

                    };

                }

            );

        observers.cls.observe({

            type:

                "layout-shift",

            buffered: true

        });

    }

    catch (error) {}

    /* ---------- INP ---------- */

    try {

        observers.inp =

            new PerformanceObserver(

                function (list) {

                    const entries =

                        list.getEntries();

                    const latest =

                        entries[

                            entries.length - 1

                        ];

                    vitals.inp = {

                        value:

                            Math.round(

                                latest.duration

                            )

                    };

                }

            );

        observers.inp.observe({

            type:

                "event",

            buffered: true

        });

    }

    catch (error) {}

    return true;

}

/* ==========================================================
   STOP OBSERVERS
========================================================== */

function stopObservers() {

    Object.values(

        observers

    ).forEach(function (observer) {

        if (

            observer

        ) {

            observer.disconnect();

        }

    });

}

/* ==========================================================
   CORE WEB VITALS RUNNER
========================================================== */

function run() {

    startObservers();

    const result =

        createResult();

    result.vitals.lcp =

        getLCP();

    result.vitals.fcp =

        getFCP();

    result.vitals.ttfb =

        getTTFB();

    result.vitals.cls =

        vitals.cls;

    result.vitals.inp =

        vitals.inp;

    return result;

}

/* ==========================================================
   VALIDATION
========================================================== */

function validate() {

    const issues = [];

    if (

        vitals.fcp === null

    ) {

        issues.push(

            "FCP unavailable."

        );

    }

    if (

        vitals.ttfb === null

    ) {

        issues.push(

            "TTFB unavailable."

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

        availableVitals:

            Object.values(vitals)

                .filter(Boolean)

                .length,

        totalVitals: 5

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

        "Vitals:",

        stats.availableVitals +

        "/" +

        stats.totalVitals

    );

    console.log(

        "----------------------------------------"

    );

    if (

        validation.valid

    ) {

        console.log(

            "%cSTATUS: CORE WEB VITALS READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: CORE WEB VITALS HAS WARNINGS"

        );

        validation.issues.forEach(function (issue) {

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

window.ToolXoneCoreWebVitals = Object.freeze({

    getLCP,

    getCLS: function () {

        return vitals.cls;

    },

    getINP: function () {

        return vitals.inp;

    },

    getFCP,

    getTTFB,

    startObservers,

    stopObservers,

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

    "color:#22c55e;font-weight:bold;"

);

})();