/*!
 * ==========================================================
 * ToolXone SEO Schema Engine
 * ----------------------------------------------------------
 * Centralized JSON-LD Schema Management Engine
 *
 * Version : 1.0.0
 * Author  : ToolXone
 *
 * Purpose:
 *  - Generate structured data for every ToolXone page
 *  - Prevent duplicate JSON-LD
 *  - Keep SEO architecture centralized
 *  - Provide reusable schema builders
 * ==========================================================
 */

(function () {

"use strict";

/* ==========================================================
   ENGINE CONSTANTS
========================================================== */

const ENGINE_NAME = "ToolXone Schema Engine";

const ENGINE_VERSION = "1.0.0";

const JSONLD_TYPE = "application/ld+json";

const SCHEMA_ATTRIBUTE = "data-toolxone-schema";

/* ==========================================================
   DEFAULT CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    prettyPrint: true,

    removeExisting: true,

    appendToHead: true

});

/* ==========================================================
   INTERNAL HELPERS
========================================================== */

function isObject(value) {

    return (

        value !== null &&

        typeof value === "object" &&

        !Array.isArray(value)

    );

}

function isArray(value) {

    return Array.isArray(value);

}

function clone(value) {

    return JSON.parse(

        JSON.stringify(value)

    );

}

function merge(target, source) {

    return Object.assign(

        {},

        target,

        source

    );

}

function createScriptElement() {

    const script =

        document.createElement("script");

    script.type = JSONLD_TYPE;

    script.setAttribute(

        SCHEMA_ATTRIBUTE,

        "true"

    );

    return script;

}

function removeExistingSchemas() {

    document

        .querySelectorAll(

            'script[' +

            SCHEMA_ATTRIBUTE +

            ']'

        )

        .forEach(

            node => node.remove()

        );

}

function injectSchema(schema) {

    if (!schema) {

        return;

    }

    const script =

        createScriptElement();

    script.textContent =

        JSON.stringify(

            schema,

            null,

            DEFAULT_OPTIONS.prettyPrint

                ? 4

                : 0

        );

    const parent =

        DEFAULT_OPTIONS.appendToHead

            ? document.head

            : document.body;

    parent.appendChild(script);

}

/* ==========================================================
   VALIDATION
========================================================== */

function validateSchema(schema) {

    if (!isObject(schema)) {

        throw new Error(

            ENGINE_NAME +

            ": Schema must be an object."

        );

    }

    if (!schema["@type"]) {

        throw new Error(

            ENGINE_NAME +

            ": Missing @type."

        );

    }

    return true;

}

/* ==========================================================
   PUBLIC RENDER QUEUE
========================================================== */

const renderQueue = [];

function queue(schema) {

    validateSchema(schema);

    renderQueue.push(

        clone(schema)

    );

}

/* ==========================================================
   INTERNAL RENDERER
========================================================== */

function flush() {

    if (

        DEFAULT_OPTIONS.removeExisting

    ) {

        removeExistingSchemas();

    }

    renderQueue.forEach(

        injectSchema

    );

    renderQueue.length = 0;

}

/* ==========================================================
   SCHEMA BUILDERS
========================================================== */

/**
 * Build Organization Schema
 */
function buildOrganization(config = {}) {

    return merge({

        "@context": "https://schema.org",

        "@type": "Organization",

        name: "",

        url: "",

        logo: "",

        description: "",

        email: "",

        sameAs: []

    }, config);

}

/**
 * Build Website Schema
 */
function buildWebSite(config = {}) {

    return merge({

        "@context": "https://schema.org",

        "@type": "WebSite",

        name: "",

        url: "",

        description: "",

        inLanguage: "en",

        publisher: {}

    }, config);

}

/**
 * Build WebPage Schema
 */
function buildWebPage(config = {}) {

    return merge({

        "@context": "https://schema.org",

        "@type": "WebPage",

        name: "",

        url: "",

        description: "",

        inLanguage: "en",

        isPartOf: {},

        breadcrumb: {}

    }, config);

}

/**
 * Build SoftwareApplication Schema
 */
function buildSoftwareApplication(config = {}) {

    return merge({

        "@context": "https://schema.org",

        "@type": "SoftwareApplication",

        name: "",

        applicationCategory: "",

        operatingSystem: "Web",

        browserRequirements:
            "Requires JavaScript",

        offers: {

            "@type": "Offer",

            price: "0",

            priceCurrency: "USD"

        }

    }, config);

}

/**
 * Build Breadcrumb Schema
 */
function buildBreadcrumbList(items = []) {

    return {

        "@context": "https://schema.org",

        "@type": "BreadcrumbList",

        itemListElement:

            items.map(

                (item, index) => ({

                    "@type": "ListItem",

                    position: index + 1,

                    name: item.name,

                    item: item.url

                })

            )

    };

}

/**
 * Build FAQ Schema
 */
function buildFAQPage(questions = []) {

    return {

        "@context": "https://schema.org",

        "@type": "FAQPage",

        mainEntity:

            questions.map(

                faq => ({

                    "@type": "Question",

                    name: faq.question,

                    acceptedAnswer: {

                        "@type": "Answer",

                        text: faq.answer

                    }

                })

            )

    };

}

/* ==========================================================
   SCHEMA REGISTRY
========================================================== */

const SCHEMA_BUILDERS = Object.freeze({

    organization: buildOrganization,

    website: buildWebSite,

    webpage: buildWebPage,

    application: buildSoftwareApplication,

    breadcrumbs: buildBreadcrumbList,

    faq: buildFAQPage

});

/* ==========================================================
   RENDER HELPERS
========================================================== */

function hasValue(value) {

    if (value === null || value === undefined) {
        return false;
    }

    if (typeof value === "string") {
        return value.trim().length > 0;
    }

    if (Array.isArray(value)) {
        return value.length > 0;
    }

    if (typeof value === "object") {
        return Object.keys(value).length > 0;
    }

    return true;

}

function renderSchema(type, data) {

    const builder = SCHEMA_BUILDERS[type];

    if (!builder) {

        console.warn(

            ENGINE_NAME +
            ": Unknown schema type -> " +
            type

        );

        return;

    }

    const schema = builder(data);

    queue(schema);

}

/* ==========================================================
   MAIN RENDER PIPELINE
========================================================== */

function render(config = {}) {

    if (!isObject(config)) {

        throw new Error(

            ENGINE_NAME +

            ": render() expects an object."

        );

    }

    Object.entries(config)

        .forEach(

            ([type, data]) => {

                if (!hasValue(data)) {

                    return;

                }

                renderSchema(

                    type,

                    data

                );

            }

        );

    flush();

}

/* ==========================================================
   ENGINE INFORMATION
========================================================== */

function version() {

    return ENGINE_VERSION;

}

function name() {

    return ENGINE_NAME;

}

function clear() {

    removeExistingSchemas();

}

function registeredSchemas() {

    return Object.keys(

        SCHEMA_BUILDERS

    );

}

/* ==========================================================
   PUBLIC API
========================================================== */

/**
 * Render structured data for a ToolXone page.
 *
 * Example:
 *
 * ToolXoneSchema.render({
 *     organization: {...},
 *     website: {...},
 *     webpage: {...},
 *     application: {...},
 *     breadcrumbs: [...],
 *     faq: [...]
 * });
 */
const ToolXoneSchema = Object.freeze({

    render,

    queue,

    clear,

    version,

    name,

    registeredSchemas,

    builders: Object.freeze({

        organization: buildOrganization,

        website: buildWebSite,

        webpage: buildWebPage,

        application: buildSoftwareApplication,

        breadcrumbs: buildBreadcrumbList,

        faq: buildFAQPage

    })

});

/* ==========================================================
   DEBUG INFORMATION
========================================================== */

console.info(

    `%c${ENGINE_NAME} v${ENGINE_VERSION} initialized`,

    "color:#0ea5e9;font-weight:bold;"

);

console.info(

    "Supported Schemas:",

    registeredSchemas().join(", ")

);

/* ==========================================================
   EXPORT
========================================================== */

window.ToolXoneSchema = ToolXoneSchema;

})();