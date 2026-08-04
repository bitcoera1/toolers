/*!
 * ==========================================================
 * ToolXone Meta Engine
 * ----------------------------------------------------------
 * Automatically renders page metadata from ToolXone
 * Page Schema definitions.
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
    "ToolXone Meta Engine";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   DEFAULT CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    removeExisting: true,

    overwriteExisting: true

});

/* ==========================================================
   DOM HELPERS
========================================================== */

function getHead() {

    return document.head;

}

function findMeta(selector) {

    return document.head.querySelector(
        selector
    );

}

function createMeta() {

    return document.createElement(
        "meta"
    );

}

function createLink() {

    return document.createElement(
        "link"
    );

}

/* ==========================================================
   INTERNAL HELPERS
========================================================== */

function ensureMeta(attribute, value) {

    const selector =
        `meta[${attribute}]`;

    let element =
        findMeta(selector);

    if (!element) {

        element = createMeta();

        element.setAttribute(
            attribute,
            value
        );

        getHead().appendChild(
            element
        );

    }

    return element;

}

function ensureLink(rel) {

    let element =
        document.head.querySelector(
            `link[rel="${rel}"]`
        );

    if (!element) {

        element = createLink();

        element.rel = rel;

        getHead().appendChild(
            element
        );

    }

    return element;

}

/* ==========================================================
   TITLE
========================================================== */

function renderTitle(title) {

    if (!title) {
        return;
    }

    document.title = title;

}

/* ==========================================================
   BASIC META
========================================================== */

function renderBasic(basic = {}) {

    renderTitle(basic.title);

    if (basic.description) {

        ensureMeta(
            "name",
            "description"
        ).content =
            basic.description;

    }

    if (
        Array.isArray(basic.keywords)
    ) {

        ensureMeta(
            "name",
            "keywords"
        ).content =
            basic.keywords.join(", ");

    }

}

/* ==========================================================
   CANONICAL
========================================================== */

function renderCanonical(canonical = {}) {

    if (!canonical.href) {
        return;
    }

    ensureLink("canonical").href =
        canonical.href;

}

/* ==========================================================
   ROBOTS
========================================================== */

function renderRobots(robots = {}) {

    if (!robots.content) {
        return;
    }

    ensureMeta(
        "name",
        "robots"
    ).content =
        robots.content;

}

/* ==========================================================
   APPLICATION
========================================================== */

function renderApplication(application = {}) {

    if (application.name) {

        ensureMeta(
            "name",
            "application-name"
        ).content =
            application.name;

    }

}

/* ==========================================================
   MOBILE
========================================================== */

function renderMobile(mobile = {}) {

    if (mobile.appleTitle) {

        ensureMeta(
            "name",
            "apple-mobile-web-app-title"
        ).content =
            mobile.appleTitle;

    }

    if (mobile.themeColor) {

        ensureMeta(
            "name",
            "theme-color"
        ).content =
            mobile.themeColor;

    }

}

/* ==========================================================
   GENERIC META GROUP RENDERER
========================================================== */

function renderMetaGroup(
    attribute,
    prefix,
    values = {}
) {

    Object.entries(values).forEach(

        ([key, value]) => {

            if (
                value === undefined ||
                value === null ||
                value === ""
            ) {
                return;
            }

            const attributeValue =
                `${prefix}${key}`;

            const selector =
                `meta[${attribute}="${attributeValue}"]`;

            let element =
                findMeta(selector);

            if (!element) {

                element = createMeta();

                element.setAttribute(
                    attribute,
                    attributeValue
                );

                getHead().appendChild(
                    element
                );

            }

            element.content = value;

        }

    );

}

/* ==========================================================
   OPEN GRAPH
========================================================== */

function renderOpenGraph(
    openGraph = {}
) {

    const values = {

        title:
            openGraph.title,

        description:
            openGraph.description,

        type:
            openGraph.type,

        url:
            openGraph.url,

        image:
            openGraph.image,

        "image:width":
            openGraph.imageWidth,

        "image:height":
            openGraph.imageHeight,

        "image:alt":
            openGraph.imageAlt,

        site_name:
            openGraph.siteName,

        locale:
            openGraph.locale

    };

    renderMetaGroup(

        "property",

        "og:",

        values

    );

}

/* ==========================================================
   TWITTER / X
========================================================== */

function renderTwitter(
    twitter = {}
) {

    const values = {

        card:
            twitter.card,

        site:
            twitter.site,

        title:
            twitter.title,

        description:
            twitter.description,

        image:
            twitter.image,

        "image:alt":
            twitter.imageAlt

    };

    renderMetaGroup(

        "name",

        "twitter:",

        values

    );

}

/* ==========================================================
   RENDERING PIPELINE
========================================================== */

function render(
    meta,
    options = {}
) {

    if (
        !meta ||
        typeof meta !== "object"
    ) {
        throw new TypeError(
            "Meta definition must be an object."
        );
    }

    const settings = {

        ...DEFAULT_OPTIONS,

        ...options

    };

    void settings;

    renderBasic(
        meta.basic
    );

    renderCanonical(
        meta.canonical
    );

    renderRobots(
        meta.robots
    );

    renderApplication(
        meta.application
    );

    renderMobile(
        meta.mobile
    );

    renderOpenGraph(
        meta.openGraph
    );

    renderTwitter(
        meta.twitter
    );

}

/* ==========================================================
   REMOVE GENERATED META
========================================================== */

function clearGenerated() {

    document.head
        .querySelectorAll(
            "meta[data-toolxone-meta]"
        )
        .forEach(

            element => element.remove()

        );

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

        features: [

            "Title",

            "Description",

            "Keywords",

            "Canonical",

            "Robots",

            "Application",

            "Mobile",

            "Open Graph",

            "Twitter"

        ]

    };

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneMeta = Object.freeze({

    render,

    clearGenerated,

    info

});

console.info(

    "%c" +
    ENGINE_NAME +
    " v" +
    ENGINE_VERSION +
    " initialized",

    "color:#2563eb;font-weight:bold;"

);

})();