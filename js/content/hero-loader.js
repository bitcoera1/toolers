/*
==========================================================
 ToolXone Hero Loader
 Dynamic Hero Content Loader
 Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const LOADER_NAME = "ToolXone Hero Loader";

const LOADER_VERSION = "1.0.0";

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

    lastLoaded : null,

    currentTool : null

};

/*=========================================================
Statistics
=========================================================*/

const statistics = {

    loads : 0,

    failed : 0

};

/*=========================================================
Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

        console.log(

            "[Hero Loader]",

            ...message

        );

    }

}

/*=========================================================
Initialize
=========================================================*/

function initialize(){

    if(state.initialized){

        return true;

    }

    state.initialized = true;

    log("Initialized");

    return true;

}

/*=========================================================
Load Hero
=========================================================*/

function load(tool){

    if(

        !window.ToolXoneContentRegistry

    ){

        statistics.failed++;

        return null;

    }

    const hero =

        window.ToolXoneContentRegistry.get(

            "hero",

            tool

        );

    if(hero){

        state.currentTool = tool;

        state.lastLoaded = Date.now();

        statistics.loads++;

    }

    else{

        statistics.failed++;

    }

    return hero;

}

/*=========================================================
Exists
=========================================================*/

function exists(tool){

    return load(tool) !== null;

}

/*=========================================================
Clear
=========================================================*/

function clear(){

    state.currentTool = null;

    state.lastLoaded = null;

    statistics.loads = 0;

    statistics.failed = 0;

}

/*=========================================================
Refresh
=========================================================*/

function refresh(){

    state.lastLoaded = Date.now();

    return true;

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

    console.log(

        "Version:",

        LOADER_VERSION

    );

    console.log(

        "Initialized:",

        state.initialized

    );

    console.log(

        "Current Tool:",

        state.currentTool

    );

    console.log(

        "Loads:",

        statistics.loads

    );

    console.log(

        "Failed:",

        statistics.failed

    );

    console.groupEnd();

}

/*=========================================================
Public API
=========================================================*/

window.ToolXoneHeroLoader = {

    name : LOADER_NAME,

    version : LOADER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    load,

    exists,

    clear,

    refresh,

    info,

    report

};

/*=========================================================
Auto Initialize
=========================================================*/

if(

    configuration.autoInitialize

){

    initialize();

}

console.info(

    LOADER_NAME +

    " v" +

    LOADER_VERSION +

    " initialized"

);

})();