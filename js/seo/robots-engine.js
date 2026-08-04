/*!
 * ==========================================================
 * ToolXone Robots Engine
 * ----------------------------------------------------------
 * Automatic robots.txt generation engine.
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
    "ToolXone Robots Engine";

const ENGINE_VERSION =
    "1.0.0";

/* ==========================================================
   DEFAULT CONFIGURATION
========================================================== */

const DEFAULT_OPTIONS = Object.freeze({

    userAgent:
        "*",

    allow:
        ["/"],

    disallow:
        [],

    sitemap:
        "https://www.toolxone.com/sitemap.xml",

    host:
        "https://www.toolxone.com"

});

/* ==========================================================
   RULE REGISTRY
========================================================== */

const robotRules = [];

/* ==========================================================
   RULE MODEL
========================================================== */

function createRule(
    data = {}
) {

    return {

        userAgent:

            data.userAgent ??

            DEFAULT_OPTIONS.userAgent,

        allow:

            Array.isArray(data.allow)

                ? [...data.allow]

                : [...DEFAULT_OPTIONS.allow],

        disallow:

            Array.isArray(data.disallow)

                ? [...data.disallow]

                : [...DEFAULT_OPTIONS.disallow],

        sitemap:

            data.sitemap ??

            DEFAULT_OPTIONS.sitemap,

        host:

            data.host ??

            DEFAULT_OPTIONS.host

    };

}

/* ==========================================================
   RESULT MODEL
========================================================== */

function createResult() {

    return {

        success: true,

        generated: 0,

        text: ""

    };

}

/* ==========================================================
   HELPER FUNCTIONS
========================================================== */

function getRules() {

    return [

        ...robotRules

    ];

}

function clearRules() {

    robotRules.length = 0;

}

function countRules() {

    return robotRules.length;

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

        defaultUserAgent:
            DEFAULT_OPTIONS.userAgent,

        defaultHost:
            DEFAULT_OPTIONS.host

    };

}

/* ==========================================================
   REGISTER RULE
========================================================== */

function registerRule(
    ruleData
) {

    const rule =
        createRule(ruleData);

    const exists =
        robotRules.some(

            item =>

                item.userAgent ===

                rule.userAgent

        );

    if (

        exists

    ) {

        return false;

    }

    robotRules.push(

        rule

    );

    return true;

}

/* ==========================================================
   REMOVE RULE
========================================================== */

function removeRule(
    userAgent
) {

    const index =
        robotRules.findIndex(

            rule =>

                rule.userAgent ===

                userAgent

        );

    if (

        index === -1

    ) {

        return false;

    }

    robotRules.splice(

        index,

        1

    );

    return true;

}

/* ==========================================================
   FIND RULE
========================================================== */

function findRule(
    userAgent
) {

    return (

        robotRules.find(

            rule =>

                rule.userAgent ===

                userAgent

        ) || null

    );

}

/* ==========================================================
   UPDATE RULE
========================================================== */

function updateRule(

    userAgent,

    updates = {}

) {

    const rule =

        findRule(

            userAgent

        );

    if (

        !rule

    ) {

        return false;

    }

    Object.assign(

        rule,

        updates

    );

    return true;

}

/* ==========================================================
   RULE STATISTICS
========================================================== */

function statistics() {

    return {

        totalRules:

            robotRules.length,

        userAgents:

            robotRules.map(

                rule =>

                    rule.userAgent

            ),

        allowRules:

            robotRules.reduce(

                (

                    total,

                    rule

                ) =>

                    total +

                    rule.allow.length,

                0

            ),

        disallowRules:

            robotRules.reduce(

                (

                    total,

                    rule

                ) =>

                    total +

                    rule.disallow.length,

                0

            )

    };

}

/* ==========================================================
   USER AGENT BLOCK
========================================================== */

function createUserAgentBlock(
    rule
) {

    const lines = [];

    lines.push(

        `User-agent: ${rule.userAgent}`

    );

    rule.allow.forEach(path => {

        lines.push(

            `Allow: ${path}`

        );

    });

    rule.disallow.forEach(path => {

        lines.push(

            `Disallow: ${path}`

        );

    });

    return lines.join("\n");

}

/* ==========================================================
   ROBOTS GENERATOR
========================================================== */

function generateRobots() {

    const lines = [];

    robotRules.forEach(rule => {

        lines.push(

            createUserAgentBlock(rule)

        );

        lines.push("");

    });

    if (

        DEFAULT_OPTIONS.host

    ) {

        lines.push(

            `Host: ${DEFAULT_OPTIONS.host}`

        );

    }

    if (

        DEFAULT_OPTIONS.sitemap

    ) {

        lines.push(

            `Sitemap: ${DEFAULT_OPTIONS.sitemap}`

        );

    }

    return lines.join("\n");

}

/* ==========================================================
   BUILD ROBOTS
========================================================== */

function generate() {

    const result =

        createResult();

    result.generated =

        robotRules.length;

    result.text =

        generateRobots();

    return result;

}

/* ==========================================================
   VALIDATION
========================================================== */

function validate() {

    const issues = [];

    if (

        robotRules.length === 0

    ) {

        issues.push(

            "No robot rules registered."

        );

    }

    robotRules.forEach(rule => {

        if (

            !rule.userAgent

        ) {

            issues.push(

                "Rule missing User-agent."

            );

        }

    });

    return {

        valid:

            issues.length === 0,

        issues

    };

}

/* ==========================================================
   CONSOLE DASHBOARD
========================================================== */

function report(
    result
) {

    const stats =
        statistics();

    const validation =
        validate();

    console.group(

        ENGINE_NAME

    );

    console.log(

        "Registered Rules:",

        stats.totalRules

    );

    console.log(

        "User Agents:",

        stats.userAgents.length

    );

    console.log(

        "Allow Rules:",

        stats.allowRules

    );

    console.log(

        "Disallow Rules:",

        stats.disallowRules

    );

    console.log(

        "Generated Rules:",

        result.generated

    );

    console.log(

        "----------------------------------------"

    );

    if (

        validation.valid

    ) {

        console.log(

            "%cSTATUS: ROBOTS READY",

            "color:#16a34a;font-weight:bold;"

        );

    }

    else {

        console.warn(

            "STATUS: ROBOTS HAS WARNINGS"

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

window.ToolXoneRobots = Object.freeze({

    registerRule,

    removeRule,

    findRule,

    updateRule,

    getRules,

    clearRules,

    countRules,

    statistics,

    validate,

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

    "color:#10b981;font-weight:bold;"

);

})();