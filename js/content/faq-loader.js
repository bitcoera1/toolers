/*
==========================================================
 ToolXone FAQ Loader
 Dynamic FAQ Loading Platform
 Version: 2.1.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
 Constants
=========================================================*/

const LOADER_NAME =
    "ToolXone FAQ Loader";

const LOADER_VERSION =
    "2.1.0";


/*=========================================================
 Configuration
=========================================================*/

const configuration = {

    autoInitialize : false,

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

        console.log(
            "[FAQ Loader]",
            ...message
        );

    }

}


/*=========================================================
 Discover FAQs
=========================================================*/

function discover(){

    if(
        !window.ToolXoneContentRegistry
    ){

        return [];

    }

    return window.ToolXoneContentRegistry.list(
        "faq"
    );

}


/*=========================================================
 Fetch External FAQ
 ---------------------------------------------------------
 Legacy compatibility only.
=========================================================*/

async function fetchFAQ(path){

    if(
        typeof path !== "string" ||
        !path.trim()
    ){

        throw new Error(
            "Invalid FAQ path."
        );

    }

    log(
        "Loading external FAQ:",
        path
    );

    try{

        const response =
            await fetch(path);

        if(!response.ok){

            throw new Error(
                "Unable to load FAQ: " +
                path
            );

        }

        return await response.text();

    }

    catch(error){

        throw new Error(
            "FAQ fetch failed: " +
            error.message
        );

    }

}


/*=========================================================
 Validation
=========================================================*/

function validate(content){

    /*-----------------------------------------------------
      Legacy external FAQ
    -----------------------------------------------------*/

    if(
        typeof content === "string"
    ){

        return (
            content.trim().length > 0
        );

    }


    /*-----------------------------------------------------
      Current structured FAQ
    -----------------------------------------------------*/

    if(
        !Array.isArray(content)
    ){

        return false;

    }


    return content.every(
        item => {

            if(
                typeof item !== "object" ||
                item === null
            ){

                return false;

            }

            return (

                typeof item.question === "string" &&

                item.question.trim().length > 0 &&

                typeof item.answer === "string" &&

                item.answer.trim().length > 0

            );

        }
    );

}


/*=========================================================
 Cache Manager
=========================================================*/

function saveCache(id, content){

    cache.set(
        id,
        content
    );

    state.cached++;

}


function getCache(id){

    return cache.has(id)
        ? cache.get(id)
        : null;

}


function clearCache(){

    cache.clear();

    state.cached = 0;

}


/*=========================================================
 Load Single FAQ
=========================================================*/

async function load(id){

    /*-----------------------------------------------------
      Cache
    -----------------------------------------------------*/

    if(
        configuration.cacheFAQs &&
        cache.has(id)
    ){

        statistics.cacheHits++;

        return getCache(id);

    }


    statistics.cacheMisses++;


    /*-----------------------------------------------------
      Registry
    -----------------------------------------------------*/

    if(
        !window.ToolXoneContentRegistry
    ){

        throw new Error(
            "ToolXone Content Registry unavailable."
        );

    }


    const faq =
        window.ToolXoneContentRegistry.get(
            "faq",
            id
        );


    if(!faq){

        throw new Error(
            "FAQ not registered: " + id
        );

    }


    /*=====================================================
      CURRENT TOOLXONE STRUCTURED FAQ
      -----------------------------------------------------
      Example:

      [
          {
              question: "...",
              answer: "..."
          }
      ]
    =====================================================*/

    if(
        Array.isArray(faq)
    ){

        if(
            configuration.validateFAQs &&
            !validate(faq)
        ){

            throw new Error(
                "Invalid structured FAQ: " + id
            );

        }


        saveCache(
            id,
            faq
        );

        state.loaded++;

        statistics.successfulLoads++;

        return faq;

    }


    /*=====================================================
      LEGACY EXTERNAL FAQ
      -----------------------------------------------------
      Example:

      {
          path: "content/example-faq.md"
      }
    =====================================================*/

    if(
        typeof faq === "object" &&
        faq !== null &&
        typeof faq.path === "string" &&
        faq.path.trim()
    ){

        const content =
            await fetchFAQ(
                faq.path
            );


        if(
            configuration.validateFAQs &&
            !validate(content)
        ){

            throw new Error(
                "Invalid external FAQ: " + id
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


    /*-----------------------------------------------------
      Invalid registration
    -----------------------------------------------------*/

    throw new Error(
        "Invalid FAQ registration: " + id
    );

}


/*=========================================================
 Load All FAQs
=========================================================*/

async function loadAll(){

    const ids = discover();

    statistics.totalFAQs =
        ids.length;


    if(
        ids.length === 0
    ){

        return;

    }


    for(
        const id of ids
    ){

        try{

            await load(id);

        }

        catch(error){

            state.failed++;

            statistics.failedLoads++;

            console.error(
                "[FAQ Loader]",
                error
            );

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


    state.initialized = false;


    await initialize();

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


    try{

        await loadAll();

        state.initialized = true;

        state.lastUpdated =
            Date.now();

    }

    finally{

        state.loading = false;

    }

}


/*=========================================================
 Exists
=========================================================*/

function exists(id){

    if(
        !window.ToolXoneContentRegistry
    ){

        return false;

    }

    return !!window.ToolXoneContentRegistry.get(
        "faq",
        id
    );

}


/*=========================================================
 Information
=========================================================*/

function info(){

    return {

        name :
            LOADER_NAME,

        version :
            LOADER_VERSION,

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
        "❓ " + LOADER_NAME
    );

    console.log(
        "Version:",
        LOADER_VERSION
    );

    console.log(
        "State:",
        state
    );

    console.log(
        "Statistics:",
        statistics
    );

    console.groupEnd();

}


/*=========================================================
 Public API
=========================================================*/

window.ToolXoneFAQLoader = {

    name :
        LOADER_NAME,

    version :
        LOADER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    refresh,

    discover,

    load,

    loadAll,

    exists,

    validate,

    report,

    info,

    getCache,

    clearCache

};


/*=========================================================
 Initialization
 ---------------------------------------------------------
 Intentionally disabled here.

 Content Platform / Integration Engine should control
 initialization after all content-data files are registered.
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