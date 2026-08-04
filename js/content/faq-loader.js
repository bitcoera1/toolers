/*
==========================================================
 ToolXone FAQ Loader
 Dynamic FAQ Loading Platform
 Version: 2.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
 Constants
=========================================================*/

const LOADER_NAME = "ToolXone FAQ Loader";

const LOADER_VERSION = "2.0.0";

/*=========================================================
 Configuration
=========================================================*/

const configuration = {

    autoInitialize : true,

    cacheFAQs : true,

    validateFAQs : true,

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

    totalFAQs : 0,

    successfulLoads : 0,

    failedLoads : 0,

    cacheHits : 0,

    cacheMisses : 0

};

/*=========================================================
 Debug Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

        
    }

}

/*=========================================================
 Discover FAQs
=========================================================*/

function discover(){

    return ToolXoneContentRegistry.list(

        "faq"

    );

}

/*=========================================================
 Fetch FAQ
=========================================================*/

async function fetchFAQ(path){

    log("Loading:", path);

    const response = await fetch(path);

    if(!response.ok){

        throw new Error(

            "Unable to load FAQ: " + path

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

function saveCache(id, content){

    cache.set(id, content);

    state.cached++;

}

function getCache(id){

    return cache.get(id) || null;

}

function clearCache(){

    cache.clear();

    state.cached = 0;

}

/*=========================================================
 Load Single FAQ
=========================================================*/

async function load(id){

    if(configuration.cacheFAQs){

        const cached = getCache(id);

        if(cached){

            statistics.cacheHits++;

            return cached;

        }

    }

    statistics.cacheMisses++;

    const faq = ToolXoneContentRegistry.get(

        "faq",

        id

    );

    if(!faq){

        return null;

    }

    const content = await fetchFAQ(

        faq.path

    );

    if(

        configuration.validateFAQs &&

        !validate(content)

    ){

        throw new Error(

            "Invalid FAQ: " + id

        );

    }

    saveCache(

        id,

        content

    );

    state.loaded++;

    statistics.successfulLoads++;

    statistics.totalFAQs = cache.size;

    return content;

}

/*=========================================================
 Load All FAQs
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

    clearCache();

    statistics.totalFAQs = 0;

    statistics.successfulLoads = 0;

    statistics.failedLoads = 0;

    statistics.cacheHits = 0;

    statistics.cacheMisses = 0;

    await loadAll();

}

/*=========================================================
 Initialize
=========================================================*/

async function initialize(){

    if(state.initialized){

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

window.ToolXoneFAQLoader = {

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