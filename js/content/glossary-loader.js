/*
==========================================================
 ToolXone Glossary Loader
 Dynamic Glossary Loading Platform
 Version: 2.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const LOADER_NAME = "ToolXone Glossary Loader";

const LOADER_VERSION = "2.0.0";

/*=========================================================
Configuration
=========================================================*/

const configuration = {

    autoInitialize : true,

    cacheGlossary : true,

    validateGlossary : true,

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

    totalGlossary : 0,

    successfulLoads : 0,

    failedLoads : 0,

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

        "glossary"

    );

}

/*=========================================================
Fetch
=========================================================*/

async function fetchGlossary(path){

    log(

        "Loading:",

        path

    );

    const response = await fetch(path);

    if(!response.ok){

        throw new Error(

            "Unable to load glossary: " +

            path

        );

    }

    return await response.text();

}

/*=========================================================
Validation
=========================================================*/

function validate(content){

    return (

        typeof content === "string" &&

        content.trim().length > 0

    );

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
Load One
=========================================================*/

async function load(id){

    if(configuration.cacheGlossary){

        const cached = getCache(id);

        if(cached){

            statistics.cacheHits++;

            return cached;

        }

    }

    statistics.cacheMisses++;

    const glossary = window.ToolXoneContentRegistry.get(

        "glossary",

        id

    );

    if(!glossary){

        return null;

    }

    const content = await fetchGlossary(

        glossary.path

    );

    if(

        configuration.validateGlossary &&

        !validate(content)

    ){

        throw new Error(

            "Invalid glossary: " +

            id

        );

    }

    saveCache(

        id,

        content

    );

    state.loaded++;

    statistics.successfulLoads++;

    return content;

}

/*=========================================================
Load All
=========================================================*/

async function loadAll(){

    const ids = discover();

    statistics.totalGlossary = ids.length;

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

    clearCache();

    statistics.totalGlossary = 0;

    statistics.successfulLoads = 0;

    statistics.failedLoads = 0;

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

window.ToolXoneGlossaryLoader = {

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