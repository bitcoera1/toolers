/*
==========================================================
 ToolXone Related Content Renderer
 Dynamic Related Content Rendering Platform
 Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const RENDERER_NAME = "ToolXone Related Renderer";

const RENDERER_VERSION = "1.0.0";

/*=========================================================
Configuration
=========================================================*/

const configuration = {

    autoInitialize : true,

    animate : true,

    sanitize : true,

    debug : false

};

/*=========================================================
State
=========================================================*/

const state = {

    initialized : false,

    rendered : 0,

    failed : 0,

    lastUpdated : null

};

/*=========================================================
Statistics
=========================================================*/

const statistics = {

    renderedCards : 0,

    renderOperations : 0

};

/*=========================================================
Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

        console.log(

            "[Related Renderer]",

            ...message

        );

    }

}

/*=========================================================
HTML Sanitizer
=========================================================*/

function sanitize(text){

    if(!configuration.sanitize){

        return text;

    }

    return String(text)

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;");

}

/*=========================================================
Create Related Card
=========================================================*/

function createCard(item){

    return `

<div class="toolxone-related-card">

    <h3>

        ${sanitize(item.title || "")}

    </h3>

    <p>

        ${sanitize(item.description || "")}

    </p>

    <a

        href="${item.url || "#"}"

        class="toolxone-related-link"

    >

        View Tool →

    </a>

</div>

`;

}

/*=========================================================
Render One Card
=========================================================*/

function render(item){

    try{

        const html = createCard(

            item

        );

        state.rendered++;

        statistics.renderedCards++;

        statistics.renderOperations++;

        return html;

    }

    catch(error){

        state.failed++;

        console.error(error);

        return "";

    }

}

/*=========================================================
Render Multiple Cards
=========================================================*/

function renderAll(items){

    if(

        !Array.isArray(items)

    ){

        return "";

    }

    return items.map(function(item){

        return render(

            item

        );

    }).join("");

}

/*=========================================================
Render Into Container
=========================================================*/

function renderInto(container, items){

    if(

        typeof container === "string"

    ){

        container =

            document.querySelector(

                container

            );

    }

    if(!container){

        return false;

    }

    container.innerHTML =

        renderAll(items);

    if(configuration.animate){

        container.classList.add(

            "toolxone-fade-in"

        );

    }

    log(

        "Rendered",

        items.length,

        "related cards"

    );

    return true;

}

/*=========================================================
Refresh
=========================================================*/

function refresh(){

    state.rendered = 0;

    state.failed = 0;

    statistics.renderedCards = 0;

    statistics.renderOperations = 0;

    state.lastUpdated =

        Date.now();

}

/*=========================================================
Initialize
=========================================================*/

async function initialize(){

    if(state.initialized){

        return;

    }

    state.initialized = true;

    state.lastUpdated = Date.now();

    log("Initialized");

}

/*=========================================================
Information
=========================================================*/

function info(){

    return {

        name : RENDERER_NAME,

        version : RENDERER_VERSION,

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

/*=========================================================
Public API
=========================================================*/

window.ToolXoneRelatedRenderer = {

    name : RENDERER_NAME,

    version : RENDERER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    render,

    renderAll,

    renderInto,

    refresh,

    report,

    info

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

    RENDERER_NAME +

    " v" +

    RENDERER_VERSION +

    " initialized"

);

})();