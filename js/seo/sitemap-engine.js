/*!
 * ==========================================================
 * ToolXone Sitemap Engine
 * ----------------------------------------------------------
 * Generates XML sitemaps for ToolXone pages.
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
    "ToolXone Sitemap Engine";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    defaultChangeFrequency:
        "weekly",

    defaultPriority:
        0.8,

    xmlVersion:
        "1.0",

    xmlEncoding:
        "UTF-8"

});

/* ==========================================================
   URL REGISTRY
========================================================== */

const sitemapUrls = [];

/* ==========================================================
   URL MODEL
========================================================== */

function createUrl({

    loc,

    lastmod = "",

    changefreq =
        DEFAULT_OPTIONS.defaultChangeFrequency,

    priority =
        DEFAULT_OPTIONS.defaultPriority

}) {

    return {

        loc,

        lastmod,

        changefreq,

        priority

    };

}

/* ==========================================================
   RESULT BUILDER
========================================================== */

function createResult() {

    return {

        generated: 0,

        skipped: 0,

        errors: 0,

        xml: ""

    };

}

/* ==========================================================
   HELPER FUNCTIONS
========================================================== */

function getUrls() {

    return [

        ...sitemapUrls

    ];

}

function clearUrls() {

    sitemapUrls.length = 0;

}

function countUrls() {

    return sitemapUrls.length;

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

        defaultChangeFrequency:
            DEFAULT_OPTIONS.defaultChangeFrequency,

        defaultPriority:
            DEFAULT_OPTIONS.defaultPriority

    };

}

/* ==========================================================
   URL REGISTRATION
========================================================== */

function registerUrl(
    urlData
) {

    if (

        !urlData ||

        !urlData.loc

    ) {

        return false;

    }

    const exists = sitemapUrls.some(

        url =>

            url.loc === urlData.loc

    );

    if (exists) {

        return false;

    }

    sitemapUrls.push(

        createUrl(urlData)

    );

    return true;

}

/* ==========================================================
   URL REMOVAL
========================================================== */

function removeUrl(
    location
) {

    const index = sitemapUrls.findIndex(

        url =>

            url.loc === location

    );

    if (

        index === -1

    ) {

        return false;

    }

    sitemapUrls.splice(

        index,

        1

    );

    return true;

}

/* ==========================================================
   FIND URL
========================================================== */

function findUrl(
    location
) {

    return sitemapUrls.find(

        url =>

            url.loc === location

    ) || null;

}

/* ==========================================================
   URL SORTING
========================================================== */

function sortUrls() {

    sitemapUrls.sort(

        (

            a,

            b

        ) =>

            a.loc.localeCompare(

                b.loc

            )

    );

}

/* ==========================================================
   URL VALIDATION
========================================================== */

function isValidUrl(
    location
) {

    try {

        new URL(

            location

        );

        return true;

    }

    catch (

        error

    ) {

        return false;

    }

}

/* ==========================================================
   URL STATISTICS
========================================================== */

function statistics() {

    return {

        total:

            sitemapUrls.length,

        valid:

            sitemapUrls.filter(

                url =>

                    isValidUrl(

                        url.loc

                    )

            ).length,

        invalid:

            sitemapUrls.filter(

                url =>

                    !isValidUrl(

                        url.loc

                    )

            ).length

    };

}

/* ==========================================================
   XML HEADER
========================================================== */

function createXmlHeader() {

    return `<?xml version="${DEFAULT_OPTIONS.xmlVersion}" encoding="${DEFAULT_OPTIONS.xmlEncoding}"?>`;

}

/* ==========================================================
   URL XML
========================================================== */

function createUrlXml(
    url
) {

    return [

        "  <url>",

        `    <loc>${url.loc}</loc>`,

        url.lastmod

            ? `    <lastmod>${url.lastmod}</lastmod>`

            : "",

        `    <changefreq>${url.changefreq}</changefreq>`,

        `    <priority>${url.priority}</priority>`,

        "  </url>"

    ]

    .filter(Boolean)

    .join("\n");

}

/* ==========================================================
   XML GENERATOR
========================================================== */

function generateXml() {

    sortUrls();

    const xml = [

        createXmlHeader(),

        "",

        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

    ];

    sitemapUrls.forEach(url => {

        xml.push(

            createUrlXml(url)

        );

    });

    xml.push(

        "</urlset>"

    );

    return xml.join("\n");

}

/* ==========================================================
   BUILD SITEMAP
========================================================== */

function generate() {

    const result =

        createResult();

    result.generated =

        sitemapUrls.length;

    result.xml =

        generateXml();

    return result;

}

/* ==========================================================
   CONSOLE DASHBOARD
========================================================== */

function report(
    result
) {

    const stats =
        statistics();

    console.group(

        ENGINE_NAME

    );

    console.log(

        "Registered URLs:",

        stats.total

    );

    console.log(

        "Valid URLs:",

        stats.valid

    );

    console.log(

        "Invalid URLs:",

        stats.invalid

    );

    console.log(

        "Generated URLs:",

        result.generated

    );

    console.log(

        "----------------------------------------"

    );

    if (

        result.generated === stats.valid &&

        stats.invalid === 0

    ) {

        console.log(

            "%cSTATUS: SITEMAP READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: SITEMAP HAS WARNINGS"

        );

    }

    console.groupEnd();

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneSitemap = Object.freeze({

    registerUrl,

    removeUrl,

    findUrl,

    getUrls,

    clearUrls,

    countUrls,

    sortUrls,

    statistics,

    generate,

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

    "color:#0ea5e9;font-weight:bold;"

);

})();