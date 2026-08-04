/*!
 * ==========================================================
 * ToolXone Meta Registry
 * ----------------------------------------------------------
 * Central registry for ToolXone page metadata.
 *
 * Version : 1.0.0
 * Author  : ToolXone
 * ==========================================================
 */

(function () {

"use strict";

const REGISTRY = new Map();

const VERSION = "1.0.0";

function register(name, meta) {

    if (typeof name !== "string") {
        throw new TypeError(
            "Meta name must be a string."
        );
    }

    if (!meta || typeof meta !== "object") {
        throw new TypeError(
            "Meta definition must be an object."
        );
    }

    if (REGISTRY.has(name)) {
        console.warn(
            `[MetaRegistry] "${name}" already registered. Replacing existing definition.`
        );
    }

    REGISTRY.set(name, meta);

    return meta;
}

function get(name) {

    return REGISTRY.get(name) || null;

}

function has(name) {

    return REGISTRY.has(name);

}

function remove(name) {

    return REGISTRY.delete(name);

}

function clear() {

    REGISTRY.clear();

}

function count() {

    return REGISTRY.size;

}

function registeredPages() {

    return [...REGISTRY.keys()];

}

function info() {

    return {

        version: VERSION,

        totalPages: count(),

        registeredPages: registeredPages()

    };

}

window.ToolXoneMetaRegistry = {

    register,

    get,

    has,

    remove,

    clear,

    count,

    registeredPages,

    info

};

console.info(

    "%cToolXone Meta Registry v" + VERSION + " initialized",

    "color:#10b981;font-weight:bold;"

);

})();