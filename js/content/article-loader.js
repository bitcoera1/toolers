/*
==========================================================
 ToolXone Article Loader
 Dynamic Markdown Article Loading Platform
 Version: 2.0.0
==========================================================
*/

(function () {

"use strict";

/*=========================================================
  Constants
=========================================================*/

const LOADER_NAME = "ToolXone Article Loader";
const LOADER_VERSION = "2.0.0";

/*=========================================================
  Configuration
=========================================================*/

const configuration = {

    autoInitialize : true,

    cacheArticles : true,

    validateArticles : true,

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

    totalArticles : 0,

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
  Discover Articles
=========================================================*/

function discover(){

    return ToolXoneContentRegistry.list(

        "articles"

    );

}

/*=========================================================
  Fetch Article
=========================================================*/

async function fetchArticle(path){

    log("Loading:", path);

    const response = await fetch(path);

    if(!response.ok){

        throw new Error(

            "Unable to load article: " + path

        );

    }

    const markdown = await response.text();

    log("Loaded:", path);

    return markdown;

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
  Load Single Article
=========================================================*/

async function load(id){

    if(configuration.cacheArticles){

        const cached = getCache(id);

        if(cached){

            statistics.cacheHits++;

            return cached;

        }

    }

    statistics.cacheMisses++;

    const article = ToolXoneContentRegistry.get(

        "articles",

        id

    );

    if(!article){

        return null;

    }

    const markdown = await fetchArticle(

        article.path

    );

    if(

        configuration.validateArticles &&

        !validate(markdown)

    ){

        throw new Error(

            "Invalid article: " + id

        );

    }

    saveCache(

        id,

        markdown

    );

    state.loaded++;

    statistics.successfulLoads++;

    statistics.totalArticles = cache.size;

    return markdown;

}

/*=========================================================
  Load All Articles
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

    statistics.totalArticles = 0;

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

window.ToolXoneArticleLoader = {

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