/*
==========================================================
 ToolXone Schema Loader
 Dynamic JSON-LD Schema Loading Platform
 Version: 2.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const LOADER_NAME = "ToolXone Schema Loader";

const LOADER_VERSION = "2.0.0";

/*=========================================================
Configuration
=========================================================*/

const configuration = {

    autoInitialize : true,

    autoApply : false,

    cacheSchemas : true,

    validateSchemas : true,

    debug : false

};

/*=========================================================
State
=========================================================*/

const state = {

    initialized : false,

    loading : false,

    loaded : 0,

    failed : 0,

    cached : 0,

    applied : 0,

    lastUpdated : null

};

/*=========================================================
Cache
=========================================================*/

const cache = new Map();

/*=========================================================
Statistics
=========================================================*/

const statistics = {

    totalSchemas : 0,

    successfulLoads : 0,

    failedLoads : 0,

    appliedSchemas : 0,

    cacheHits : 0,

    cacheMisses : 0

};

/*=========================================================
Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

    }

}

/*=========================================================
Discover
=========================================================*/

function discover(){

    if(!window.ToolXoneContentRegistry){

        return [];

    }

    return window.ToolXoneContentRegistry.list(

        "schema"

    );

}

/*=========================================================
Fetch
=========================================================*/

async function fetchSchema(path){

    log(

        "Loading:",

        path

    );

    try{

    const response = await fetch(path);

    if(!response.ok){

        throw new Error(
            "Unable to load schema: " + path
        );

    }

    return await response.text();

}

catch(error){

    throw new Error(
        "Schema fetch failed: " +
        error.message
    );

}

}

/*=========================================================
Validation
=========================================================*/

function validate(content){

    if(

        typeof content !== "string"

    ){

        return false;

    }

    if(

        content.trim().length === 0

    ){

        return false;

    }

    try{

        JSON.parse(content);

        return true;

    }

    catch(error){

        return false;

    }

}

/*=========================================================
Cache Manager
=========================================================*/

function saveCache(id,content){

    cache.set(

        id,

        content

    );

    state.cached = cache.size;

}

function getCache(id){

    return cache.get(id) || null;

}

function clearCache(){

    cache.clear();

    state.cached = 0;

}

/*=========================================================
Apply Schema
=========================================================*/

function applySchema(id,content){

    removeSchema(id);

    const script = document.createElement(

        "script"

    );

    script.type = "application/ld+json";

    script.dataset.toolxoneSchema = id;

    script.textContent = content;

    document.head.appendChild(

        script

    );

    state.applied++;

    statistics.appliedSchemas++;

}

/*=========================================================
Remove Schema
=========================================================*/

function removeSchema(id){

    const existing = document.querySelector(

        'script[data-toolxone-schema="' +

        id +

        '"]'

    );

    if(existing){

        existing.remove();

    }

}

/*=========================================================
Load One
=========================================================*/

async function load(id){

    if(configuration.cacheSchemas){

        const cached = getCache(id);

        if(cached){

            statistics.cacheHits++;

            if(configuration.autoApply){

                applySchema(

                    id,

                    cached

                );

            }

            return cached;

        }

    }

    statistics.cacheMisses++;

    const schema = window.ToolXoneContentRegistry.get(

        "schema",

        id

    );

    if(!schema){

        return null;

    }

    const content = await fetchSchema(

        schema.path

    );

    if(

        configuration.validateSchemas &&

        !validate(content)

    ){

        throw new Error(

            "Invalid schema: " +

            id

        );

    }

    saveCache(

        id,

        content

    );

    state.loaded++;

    statistics.successfulLoads++;

    statistics.totalSchemas = cache.size;

    if(configuration.autoApply){

        applySchema(

            id,

            content

        );

    }

    return content;

}

/*=========================================================
Load All
=========================================================*/

async function loadAll(){

    const ids = discover();

    if(ids.length === 0){

        return;

    }

    for(const id of ids){

        try{

            await load(id);

        }

        catch(error){

            state.failed++;

            statistics.failedLoads++;

            console.error(error);

        }

    }

}

/*=========================================================
Refresh
=========================================================*/

async function refresh(){

    state.loaded = 0;

    state.failed = 0;

    state.cached = 0;

    state.applied = 0;

    clearCache();

    statistics.totalSchemas = 0;

    statistics.successfulLoads = 0;

    statistics.failedLoads = 0;

    statistics.appliedSchemas = 0;

    statistics.cacheHits = 0;

    statistics.cacheMisses = 0;

    await loadAll();

    state.lastUpdated = Date.now();

}

/*=========================================================
Initialize
=========================================================*/

async function initialize(){

    if(

    state.initialized ||

    state.loading

){

    return;

}

    state.loading = true;

    await loadAll();

    state.loading = false;

    state.initialized = true;

    state.lastUpdated = Date.now();

}

/*=========================================================
Information
=========================================================*/

function info(){

    return {

        name : LOADER_NAME,

        version : LOADER_VERSION,

        configuration,

        state,

        statistics

    };

}

/*=========================================================
Report
=========================================================*/

function report(){

    console.group(

        LOADER_NAME

    );

    console.groupEnd();

}

/*=========================================================
Public API
=========================================================*/

window.ToolXoneSchemaLoader = {

    name : LOADER_NAME,

    version : LOADER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    refresh,

    discover,

    load,

    loadAll,

    applySchema,

    removeSchema,

    validate,

    report,

    info,

    getCache,

    clearCache

};

/*=========================================================
Auto Initialize
=========================================================*/

if(configuration.autoInitialize){

    initialize();

}

console.info(

    LOADER_NAME +

    " v" +

    LOADER_VERSION +

    " initialized"

);

})();