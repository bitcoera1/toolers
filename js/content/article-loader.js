/*
==========================================================
 ToolXone Article Loader
 Dynamic Markdown Article Loading Platform
 Version: 2.0.0
==========================================================
*/

(function(){

"use strict";

const LOADER_NAME = "ToolXone Article Loader";

const LOADER_VERSION = "2.0.0";

const configuration = {

    autoInitialize : true,

    autoDiscover : true,

    cacheArticles : true,

    validateArticles : true,

    autoRegister : true,

    debug : false

};

const state = {

    initialized : false,

    loading : false,

    loaded : 0,

    failed : 0,

    cached : 0,

    lastUpdated : Date.now()

};

const cache = new Map();

const statistics = {

    totalArticles : 0,

    successfulLoads : 0,

    failedLoads : 0,

    cacheHits : 0,

    cacheMisses : 0

};

function discover(){

    if(!window.ToolXoneContentRegistry){

        return [];

    }

    return window.ToolXoneContentRegistry.list(
        "articles"
    );

}

async function fetchArticle(path){

    try{

        const response = await fetch(path);

        if(!response.ok){

            throw new Error(
                "Unable to load article."
            );

        }

        return await response.text();

    }

    catch(error){

        console.error(

            "[Article Loader]",

            error

        );

        return null;

    }

}

function validate(content){

    return (

        typeof content === "string" &&

        content.trim().length > 0

    );

}

function saveCache(id, content){

    cache.set(id, content);

    state.cached++;


}

function getCache(id){

    return cache.get(id) || null;

}

async function load(id){

    if(configuration.cacheArticles){

        const cached = getCache(id);

        if(cached){

            statistics.cacheHits++;

            return cached;

        }

    }

    statistics.cacheMisses++;

    const article =

        window.ToolXoneContentRegistry.get(

            "articles",

            id

        );

    if(!article){

        return null;

    }

    const markdown =

        await fetchArticle(

            article.path

        );

    if(

        !validate(markdown)

    ){

        throw new Error(

            "Invalid article."

        );

    }

    saveCache(

        id,

        markdown

    );

    state.loaded++;

    statistics.successfulLoads++;

    return markdown;

}

async function loadAll(){

    const ids = discover();

    statistics.totalArticles = ids.length;

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

function exists(id){

    return !!window.ToolXoneContentRegistry.get(
        "articles",
        id
    );

}

function info(){

    return {

        name : LOADER_NAME,

        version : LOADER_VERSION,

        configuration,

        state,

        statistics

    };

}

function report(){

    console.group(

        LOADER_NAME

    );

    console.groupEnd();

}

async function initialize(){

    if(state.initialized){

        return;

    }

    state.loading = true;

    await loadAll();

    state.loading = false;

    state.lastUpdated = Date.now();

    state.initialized = true;

}

async function refresh(){

    cache.clear();

    state.loaded = 0;

    state.failed = 0;

    state.cached = 0;
    
    statistics.successfulLoads = 0;

    statistics.failedLoads = 0;

    statistics.cacheHits = 0;

    statistics.cacheMisses = 0;

    statistics.totalArticles = 0;

    await loadAll();

}

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

    exists, 
    
    validate,

    report,

    info,

    getCache

};

if(configuration.autoInitialize){

    initialize();

}

})();