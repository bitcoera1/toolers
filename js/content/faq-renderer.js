/*
==========================================================
ToolXone FAQ Renderer
----------------------------------------------------------
Content Platform FAQ Rendering Engine

Version : 1.1.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================*
*Constants*
*=========================================================*/

const RENDERER_NAME = "ToolXone FAQ Renderer";

const RENDERER_VERSION = "1.1.0";

/*=========================================================*
*Configuration*
*=========================================================*/

const configuration = {

    autoInitialize : true,

    animate : true,

    sanitize : true,

    debug : false

};

/*=========================================================*
*State*
*=========================================================*/

const state = {

    initialized : false,

    rendered : 0,

    failed : 0,

    lastUpdated : null

};

/*=========================================================*
*Statistics*
*=========================================================*/

const statistics = {

    renderedFAQs : 0,

    renderOperations : 0

};

/*=========================================================*
*Logger*
*=========================================================*/

function log(...message){

    if(configuration.debug){

        console.info(

            "[FAQ Renderer]",

            ...message

        );

    }

}

/*=========================================================*
*Escape HTML*
*=========================================================*/

function escapeHTML(value){

    if(

        value === null ||

        value === undefined

    ){

        return "";

    }

    return String(value)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}

/*=========================================================*
*Markdown Parser*
*=========================================================*/

function parse(markdown){

    if(

        markdown === null ||

        markdown === undefined

    ){

        return "";

    }

    let html = escapeHTML(markdown);

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

    return html;

}

/*=========================================================*
*Create FAQ Item*
*=========================================================*/

function createFAQ(question, answer){

    const safeQuestion = escapeHTML(
        String(question ?? "")
    );

    const parsedAnswer = parse(
        String(answer ?? "")
    );

    return `
        <details class="toolxone-faq-item">

            <summary>
                ${safeQuestion}
            </summary>

            <div class="toolxone-faq-answer">

                <p>
                    ${parsedAnswer}
                </p>

            </div>

        </details>
    `;
}

/*=========================================================*
*Render One FAQ*
*=========================================================*/

function render(question, answer, index = 0){

    try{

        const html = createFAQ(

            question,

            answer,

            index

        );

        state.rendered++;

        statistics.renderedFAQs++;

        statistics.renderOperations++;

        return html;

    }

    catch(error){

        state.failed++;

        console.error(

            RENDERER_NAME +

            " render error:",

            error

        );

        return "";

    }

}

/*=========================================================*
*Normalize FAQ Data*
*=========================================================*/

function normalizeFAQData(data){

    if(!data){

        return {

            title : "Frequently Asked Questions",

            questions : []

        };

    }

    /*
    ---------------------------------------------------------
    New Content Platform structure
    ---------------------------------------------------------
    */

    if(

        typeof data === "object" &&

        !Array.isArray(data) &&

        Array.isArray(data.questions)

    ){

        return {

            title :

                data.title ||

                "Frequently Asked Questions",

            questions :

                data.questions

        };

    }

    /*
    ---------------------------------------------------------
    Legacy / direct array structure
    ---------------------------------------------------------
    */

    if(Array.isArray(data)){

        return {

            title :

                "Frequently Asked Questions",

            questions :

                data

        };

    }

    return {

        title :

            "Frequently Asked Questions",

        questions : []

    };

}

/*=========================================================*
*Render Multiple FAQs*
*=========================================================*/

function renderAll(faqs){

    if(

        !Array.isArray(faqs)

    ){

        return "";

    }

    return faqs.map(function(faq, index){

        if(

            !faq ||

            typeof faq !== "object"

        ){

            return "";

        }

        return render(

            faq.question,

            faq.answer,

            index

        );

    }).join("");

}

/*=========================================================*
*Build Complete FAQ Section*
*=========================================================*/

function buildFAQ(data){

    const normalized =

        normalizeFAQData(data);

    const title =

        escapeHTML(

            normalized.title

        );

    const items =

        renderAll(

            normalized.questions

        );

    return `

        <section
            class="tx-faq-section"
            aria-labelledby="toolxone-faq-title"
        >

            <div class="tx-faq-header">

                <h2 id="toolxone-faq-title">

                    ${title}

                </h2>

            </div>

            <div class="tx-faq-list">

                ${items}

            </div>

        </section>

    `;

}

/*=========================================================
 Accordion Behavior
 ---------------------------------------------------------
 Uses native <details> elements while ensuring that only
 one FAQ item remains open at a time.
=========================================================*/

function attachAccordion(container){

    if(!container){

        return;

    }

    const items =
        container.querySelectorAll(
            ".toolxone-faq-item"
        );

    items.forEach(function(item){

        item.addEventListener(
            "toggle",
            function(){

                if(!item.open){

                    return;

                }

                items.forEach(function(other){

                    if(
                        other !== item &&
                        other.open
                    ){

                        other.open = false;

                    }

                });

            }
        );

    });

}


/*=========================================================*
*Render Into Container*
*=========================================================*/

function renderInto(container, faq){

    if(
        typeof container === "string"
    ){

        container =
            document.querySelector(
                container
            );

    }

    if(!container){

        state.failed++;

        return false;

    }

    if(!faq){

        state.failed++;

        return false;

    }

    /*
    ---------------------------------------------------------
    Normalize FAQ data
    ---------------------------------------------------------
    Supports both:

    1. Content Platform object:
       {
           title,
           questions
       }

    2. Direct FAQ array:
       [
           {
               question,
               answer
           }
       ]
    ---------------------------------------------------------
    */

    const normalized =
        normalizeFAQData(
            faq
        );

    const title =
        escapeHTML(
            normalized.title
        );

    const questions =
        normalized.questions;

    /*
    ---------------------------------------------------------
    Reset render counters for this operation
    ---------------------------------------------------------
    */

    statistics.renderOperations++;

    container.innerHTML =
    buildFAQ(
        normalized
    );

    attachAccordion(
        container
    );

    state.lastUpdated =
        Date.now();

    if(configuration.animate){

        container.classList.add(
            "toolxone-fade-in"
        );

    }

    log(
        "Rendered",
        questions.length,
        "FAQs"
    );

    return true;

}

    
/*=========================================================*
*Refresh*
*=========================================================*/

function refresh(){

    state.rendered = 0;

    state.failed = 0;

    statistics.renderedFAQs = 0;

    statistics.renderOperations = 0;

    state.lastUpdated =

        Date.now();

}

/*=========================================================*
*Initialize*
*=========================================================*/

async function initialize(){

    if(state.initialized){

        return;

    }

    state.initialized = true;

    state.lastUpdated =

        Date.now();

    log(

        "Initialized"

    );

}

/*=========================================================*
*Information*
*=========================================================*/

function info(){

    return {

        name : RENDERER_NAME,

        version : RENDERER_VERSION,

        configuration,

        state,

        statistics

    };

}

/*=========================================================*
*Report*
*=========================================================*/

function report(){

    console.group(

        RENDERER_NAME

    );

    console.log(

        "Version:",

        RENDERER_VERSION

    );

    console.log(

        "Rendered FAQs:",

        statistics.renderedFAQs

    );

    console.log(

        "Render Operations:",

        statistics.renderOperations

    );

    console.log(

        "Failed:",

        state.failed

    );

    console.groupEnd();

}

/*=========================================================*
*Public API*
*=========================================================*/

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

    sanitize : escapeHTML,

    refresh,

    report,

    info

};

/*=========================================================*
*Auto Initialize*
*=========================================================*/

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