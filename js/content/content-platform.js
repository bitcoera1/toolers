/*
==========================================================
 ToolXone Content Platform
 Master Content Management Platform
 Version: 2.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const PLATFORM_NAME = "ToolXone Content Platform";

const PLATFORM_VERSION = "2.0.0";

/*=========================================================
Configuration
=========================================================*/

const configuration = {

    autoInitialize : true,

    debug : false

};

/*=========================================================
State
=========================================================*/

const state = {

    initialized : false,

    loading : false,

    healthy : true,

    lastUpdated : null

};

/*=========================================================
Statistics
=========================================================*/

const statistics = {

    initializedModules : 0,

    failedModules : 0

};

/*=========================================================
Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

        console.log(

            "[Content Platform]",

            ...message

        );

    }

}

/*=========================================================
Initialization Engine
=========================================================*/

async function initialize(){

if(

    state.initialized ||

    state.loading

){

    return;

}

    state.loading = true;

    statistics.initializedModules = 0;

    statistics.failedModules = 0;

    const modules = [

        window.ToolXoneArticleLoader,

        window.ToolXoneFAQLoader,

        window.ToolXoneRelatedLoader,

        window.ToolXoneMetadataLoader,

        window.ToolXoneSchemaLoader,

        window.ToolXoneGlossaryLoader

    ];

    for(const module of modules){

        if(

            module &&

            typeof module.initialize === "function"

        ){

            try{

                await module.initialize();

                statistics.initializedModules++;

                log(

                    "Initialized:",

                    module.name

                );

            }

            catch(error){

                statistics.failedModules++;

                console.error(error);

            }

        }

    }

    state.loading = false;

    state.initialized = true;

    state.lastUpdated = Date.now();

}

/*=========================================================
Refresh
=========================================================*/

async function refresh(){

        statistics.initializedModules = 0;

        statistics.failedModules = 0;

    const modules = [

        window.ToolXoneArticleLoader,

        window.ToolXoneFAQLoader,

        window.ToolXoneRelatedLoader,

        window.ToolXoneMetadataLoader,

        window.ToolXoneSchemaLoader,

        window.ToolXoneGlossaryLoader

    ];

    for(const module of modules){

        if(

            module &&

            typeof module.refresh === "function"

        ){

            await module.refresh();

        }

    }

    state.lastUpdated = Date.now();

}

/*=========================================================
Health
=========================================================*/

function health(){

    return {

        healthy :

            statistics.failedModules === 0,

        initialized :

            statistics.initializedModules,

        failed :

            statistics.failedModules,

        timestamp :

            state.lastUpdated

    };

}

/*=========================================================
Information
=========================================================*/

function info(){

    return {

        name : PLATFORM_NAME,

        version : PLATFORM_VERSION,

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

        PLATFORM_NAME

    );

    console.groupEnd();

}

/*=========================================================
Public API
=========================================================*/

window.ToolXoneContentPlatform = {

    name : PLATFORM_NAME,

    version : PLATFORM_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    refresh,

    health,

    info,

    report

};

/*=========================================================
Auto Initialization
=========================================================*/

if(configuration.autoInitialize){

    initialize();

}

console.info(

    PLATFORM_NAME +

    " v" +

    PLATFORM_VERSION +

    " initialized"

);

})();