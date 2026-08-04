/*
==========================================================
 ToolXone Content Engine
 Central Content Management Engine
 Version: 1.0.0
==========================================================
*/

(function () {

"use strict";

const ENGINE_NAME = "ToolXone Content Engine";

const ENGINE_VERSION = "1.0.0";

const config = {

    autoInitialize: true,

    validateRegistry: true,

    autoDiscover: true,

    debug: false

};

const state = {

    initialized: false,

    registryReady: false,

    loadersReady: false,

    lastUpdated: null

};

const statistics = {

    articles: 0,

    faq: 0,

    metadata: 0,

    related: 0,

    glossary: 0,

    schema: 0,

    total: 0

};

function validateRegistry(){

    if(!window.ToolXoneContentRegistry){

        console.error(

            "[Content Engine] Registry not found."

        );

        return false;

    }

    return true;

}

function updateStatistics(){

    const counts =

        ToolXoneContentRegistry.counts();

    statistics.articles = counts.articles;

    statistics.faq = counts.faq;

    statistics.metadata = counts.metadata;

    statistics.related = counts.related;

    statistics.glossary = counts.glossary;

    statistics.schema = counts.schema;

    statistics.total =

        Object.values(counts)

        .reduce((a,b)=>a+b,0);

}

function initialize(){

    state.registryReady =

        validateRegistry();

    if(!state.registryReady){

        return false;

    }

    updateStatistics();

    state.initialized = true;

    state.lastUpdated = Date.now();

    return true;

}

function refresh(){

    updateStatistics();

    state.lastUpdated = Date.now();

}

function info(){

    return {

        name: ENGINE_NAME,

        version: ENGINE_VERSION,

        configuration: config,

        state,

        statistics

    };

}

function report(){

    console.group(

        ENGINE_NAME

    );

    console.log(

        "Articles:",

        statistics.articles

    );

    console.log(

        "FAQ:",

        statistics.faq

    );

    console.log(

        "Metadata:",

        statistics.metadata

    );

    console.log(

        "Related:",

        statistics.related

    );

    console.log(

        "Glossary:",

        statistics.glossary

    );

    console.log(

        "Schema:",

        statistics.schema

    );

    console.log(

        "Total:",

        statistics.total

    );

    console.groupEnd();

}

if(config.autoInitialize){

    initialize();

}

window.ToolXoneContentEngine = {

    name: ENGINE_NAME,

    version: ENGINE_VERSION,

    initialize,

    refresh,

    report,

    info,

    statistics,

    state,

    config

};

console.info(

    ENGINE_NAME +

    " v" +

    ENGINE_VERSION +

    " initialized"

);

})();