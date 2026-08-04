/*
==========================================================
ToolXone Metadata Renderer
Metadata Rendering Platform
Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

/*
==========================================================
Constants
==========================================================
*/

const RENDERER_NAME = "ToolXone Metadata Renderer";

const RENDERER_VERSION = "1.0.0";

/*
==========================================================
Configuration
==========================================================
*/

const configuration = {

    animate : false,

    sanitize : true,

    autoInitialize : true,

    debug : false

};

/*
==========================================================
State
==========================================================
*/

const state = {

    initialized : false,

    rendered : 0,

    failed : 0,

    lastUpdated : null

};

/*
==========================================================
Statistics
==========================================================
*/

const statistics = {

    renderOperations : 0,

    renderedMetadata : 0

};

/*
==========================================================
Logger
==========================================================
*/

function log(...message){

    if(configuration.debug){

        console.log(

            "[Metadata Renderer]",

            ...message

        );

    }

}

/*
==========================================================
Validation
==========================================================
*/

function validate(metadata){

    return (

        metadata &&

        typeof metadata === "object"

    );

}

/*
==========================================================
Sanitize
==========================================================
*/

function sanitize(text){

    if(!configuration.sanitize){

        return text;

    }

    return String(text)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;");

}

/*
==========================================================
Render Metadata
==========================================================
*/

function render(metadata){

    statistics.renderOperations++;

    if(!validate(metadata)){

        state.failed++;

        return "";

    }

    let html = "";

    if(metadata.title){

        html +=
`<title>${sanitize(metadata.title)}</title>\n`;

    }

    if(metadata.description){

        html +=
`<meta name="description" content="${sanitize(metadata.description)}">\n`;

    }

    if(metadata.keywords){

        html +=
`<meta name="keywords" content="${sanitize(metadata.keywords)}">\n`;

    }

    if(metadata.canonical){

        html +=
`<link rel="canonical" href="${sanitize(metadata.canonical)}">\n`;

    }

    state.rendered++;

    statistics.renderedMetadata++;

    return html;

}

/*
==========================================================
Initialize
==========================================================
*/

function initialize(){

    if(state.initialized){

        return;

    }

    state.initialized = true;

    state.lastUpdated = Date.now();

}

/*
==========================================================
Refresh
==========================================================
*/

function refresh(){

    state.rendered = 0;

    state.failed = 0;

    statistics.renderOperations = 0;

    statistics.renderedMetadata = 0;

    state.lastUpdated = Date.now();

}

/*
==========================================================
Information
==========================================================
*/

function info(){

    return {

        name : RENDERER_NAME,

        version : RENDERER_VERSION,

        configuration,

        state,

        statistics

    };

}

/*
==========================================================
Report
==========================================================
*/

function report(){

    console.group(

        RENDERER_NAME

    );

    console.log(

        "Version:",

        RENDERER_VERSION

    );

    console.log(

        "Initialized:",

        state.initialized

    );

    console.log(

        "Rendered:",

        state.rendered

    );

    console.log(

        "Failed:",

        state.failed

    );

    console.log(

        "Render Operations:",

        statistics.renderOperations

    );

    console.groupEnd();

}

/*
==========================================================
Public API
==========================================================
*/

window.ToolXoneMetadataRenderer = {

    name : RENDERER_NAME,

    version : RENDERER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    refresh,

    validate,

    render,

    report,

    info

};

/*
==========================================================
Auto Initialize
==========================================================
*/

if(configuration.autoInitialize){

    initialize();

}

console.info(

    RENDERER_NAME +

    " v" +

    RENDERER_VERSION +

    " initialized"

);

})();