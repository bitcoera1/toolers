/*!
 * ==========================================================
 * ToolXone Schema Registry
 * ----------------------------------------------------------
 * Central registry for all ToolXone page schema
 * configurations.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";

/* ==========================================================
   PRIVATE REGISTRY
========================================================== */

const registry = Object.create(null);

/* ==========================================================
   VALIDATION
========================================================== */

function validateName(name) {

    if (
        typeof name !== "string" ||
        name.trim() === ""
    ) {

        throw new Error(
            "ToolXoneSchemaRegistry: Invalid schema name."
        );

    }

}

/* ==========================================================
   REGISTRY METHODS
========================================================== */

function register(name, schema) {

    validateName(name);

    registry[name] = Object.freeze(schema);

    return registry[name];

}

function get(name) {

    validateName(name);

    return registry[name] || null;

}

function has(name) {

    validateName(name);

    return Object.prototype.hasOwnProperty.call(
        registry,
        name
    );

}

function remove(name) {

    validateName(name);

    delete registry[name];

}

function clear() {

    Object.keys(registry).forEach(

        key => delete registry[key]

    );

}

function keys() {

    return Object.keys(registry);

}

function values() {

    return Object.values(registry);

}

function entries() {

    return Object.entries(registry);

}

function count() {

    return keys().length;

}

function info() {

    return {

        version: "1.0.0",

        totalSchemas: count(),

        registeredSchemas: keys()

    };

}

/* ==========================================================
   PUBLIC API
========================================================== */

window.ToolXoneSchemaRegistry = Object.freeze({

    register,

    get,

    has,

    remove,

    clear,

    keys,

    values,

    entries,

    count,

    info

});

console.info(

    "%cToolXone Schema Registry v1.0.0 initialized",

    "color:#22c55e;font-weight:bold;"

);

})();