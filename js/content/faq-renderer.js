/*
==========================================================
 ToolXone FAQ Renderer
 Dynamic FAQ Rendering Platform
 Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const RENDERER_NAME = "ToolXone FAQ Renderer";

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

    renderedFAQs : 0,

    renderOperations : 0

};

/*=========================================================
Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

        console.log(

            "[FAQ Renderer]",

            ...message

        );

    }

}

/*=========================================================
HTML Sanitizer
=========================================================*/

function sanitize(html){

    if(!configuration.sanitize){

        return html;

    }

    return html
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;");

}

/*=========================================================
Markdown Parser
=========================================================*/

function parse(markdown){

    if(!markdown){

        return "";

    }

    let html = markdown;

    html = html.replace(

        /\*\*(.*?)\*\*/g,

        "<strong>$1</strong>"

    );

    html = html.replace(

        /\*(.*?)\*/g,

        "<em>$1</em>"

    );

    html = html.replace(

        /\n/g,

        "<br>"

    );

    statistics.renderOperations++;

    return html;

}

/*=========================================================
Create FAQ Item
=========================================================*/

function createFAQ(question, answer){

    return `
<details class="toolxone-faq-item">
<summary>${sanitize(question)}</summary>
<div class="toolxone-faq-answer">
${parse(answer)}
</div>
</details>`;

}

/*=========================================================
Render One FAQ
=========================================================*/

function render(question, answer){

    try{

        const html = createFAQ(

            question,

            answer

        );

        state.rendered++;

        statistics.renderedFAQs++;

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
Render Multiple FAQs
=========================================================*/

function renderAll(faqs){

    if(

        !Array.isArray(faqs)

    ){

        return "";

    }

    return faqs.map(function(faq){

        return render(

            faq.question,

            faq.answer

        );

    }).join("");

}

/*=========================================================
Render Into Container
=========================================================*/

function renderInto(container, faqs){

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

        renderAll(faqs);

    if(configuration.animate){

        container.classList.add(

            "toolxone-fade-in"

        );

    }

    log(

        "Rendered",

        faqs.length,

        "FAQs"

    );

    return true;

}

/*=========================================================
Refresh
=========================================================*/

function refresh(){

    state.rendered = 0;

    state.failed = 0;

    statistics.renderedFAQs = 0;

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

    return{

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

window.ToolXoneFAQRenderer = {

    name : RENDERER_NAME,

    version : RENDERER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    render,

    renderAll,

    renderInto,

    parse,

    sanitize,

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