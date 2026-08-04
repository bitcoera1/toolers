/*!
 * ============================================================
 * ToolXone Lazy Loader Engine
 * Intelligent Asset Loading System
 * Version: 1.0.0
 * ============================================================
 */

(function () {

"use strict";

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

const ENGINE_NAME =

    "ToolXone Lazy Loader";

const ENGINE_VERSION =

    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const configuration = {

    enabled: true,

    debug: false,

    rootMargin: "200px",

    threshold: 0.01,

    observeImages: true,

    observeIframes: true,

    observeBackgrounds: true,

    observeComponents: true

};

/* ==========================================================
   STORAGE
========================================================== */

const lazyElements = [];

const loadedElements = [];

const failedElements = [];

let observer = null;

/* ==========================================================
   RESULT MODEL
========================================================== */

function createResult() {

    return {

        success: true,

        timestamp: Date.now(),

        observed: lazyElements.length,

        loaded: loadedElements.length,

        failed: failedElements.length

    };

}

/* ==========================================================
   ENGINE INFO
========================================================== */

function info() {

    return {

        name: ENGINE_NAME,

        version: ENGINE_VERSION,

        configuration

    };

}

/* ==========================================================
   LOAD ELEMENT
========================================================== */

function loadElement(element) {

    if (

        !element ||

        loadedElements.includes(element)

    ) {

        return;

    }

    try {

        /* ---------- Images ---------- */

        if (

            element.dataset.src

        ) {

            element.src =

                element.dataset.src;

        }

        /* ---------- Background ---------- */

        if (

            element.dataset.background

        ) {

            element.style.backgroundImage =

                "url('" +

                element.dataset.background +

                "')";

        }

        /* ---------- Iframe ---------- */

        if (

            element.tagName === "IFRAME" &&

            element.dataset.src

        ) {

            element.src =

                element.dataset.src;

        }

        loadedElements.push(

            element

        );

        element.setAttribute(

            "data-lazy-loaded",

            "true"

        );

    }

    catch (error) {

        failedElements.push(

            element

        );

    }

}

/* ==========================================================
   OBSERVE ELEMENT
========================================================== */

function observeElement(

    element

) {

    if (

        !observer ||

        !element

    ) {

        return;

    }

    lazyElements.push(

        element

    );

    observer.observe(

        element

    );

}

/* ==========================================================
   CREATE OBSERVER
========================================================== */

function createObserver() {

    if (

        typeof IntersectionObserver ===

        "undefined"

    ) {

        return false;

    }

    observer =

        new IntersectionObserver(

            function (

                entries

            ) {

                entries.forEach(

                    function (

                        entry

                    ) {

                        if (

                            entry.isIntersecting

                        ) {

                            loadElement(

                                entry.target

                            );

                            observer.unobserve(

                                entry.target

                            );

                        }

                    }

                );

            },

            {

                rootMargin:

                    configuration.rootMargin,

                threshold:

                    configuration.threshold

            }

        );

    return true;

}

/* ==========================================================
   AUTO REGISTER
========================================================== */

function registerExistingElements() {

    document

        .querySelectorAll(

            "[data-src],[data-background]"

        )

        .forEach(

            observeElement

        );

}/* ==========================================================
   COMPONENT LOADER
========================================================== */

function loadComponent(element) {

    if (

        !element

    ) {

        return;

    }

    const event =

        new CustomEvent(

            "toolxone:lazyload",

            {

                detail: {

                    element

                }

            }

        );

    element.dispatchEvent(

        event

    );

}

/* ==========================================================
   RUNNER
========================================================== */

function run() {

    createObserver();

    registerExistingElements();

    return createResult();

}

/* ==========================================================
   VALIDATION
========================================================== */

function validate() {

    const issues = [];

    if (

        !observer

    ) {

        issues.push(

            "Observer unavailable."

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

        observed:

            lazyElements.length,

        loaded:

            loadedElements.length,

        failed:

            failedElements.length

    };

}

/* ==========================================================
   REPORT
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

        "Observed:",

        stats.observed

    );

    console.log(

        "Loaded:",

        stats.loaded

    );

    console.log(

        "Failed:",

        stats.failed

    );

    console.log(

        "--------------------------------"

    );

    if (

        validation.valid

    ) {

        console.log(

            "%cSTATUS: LAZY LOADER READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: WARNINGS"

        );

        validation.issues.forEach(

            function (

                issue

            ) {

                console.warn(

                    issue

                );

            }

        );

    }

    console.groupEnd();

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneLazyLoader = Object.freeze({

    run,

    info,

    report,

    validate,

    statistics,

    loadElement,

    loadComponent,

    observeElement,

    createObserver,

    registerExistingElements

});

/* ==========================================================
   AUTO INITIALIZATION
========================================================== */

function initialize() {

    if (

        !configuration.enabled

    ) {

        return;

    }

    run();

}

if (

    document.readyState ===

    "loading"

) {

    document.addEventListener(

        "DOMContentLoaded",

        initialize

    );

}

else {

    initialize();

}

/* ==========================================================
   ENGINE INITIALIZATION
========================================================== */

console.info(

    "%c" +

    ENGINE_NAME +

    " v" +

    ENGINE_VERSION +

    " initialized",

    "color:#f97316;font-weight:bold;"

);

})();