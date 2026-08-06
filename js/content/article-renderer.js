/*
==========================================================
 ToolXone Article Renderer
 Dynamic Markdown Rendering Platform
 Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const RENDERER_NAME = "ToolXone Article Renderer";

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

    renderedArticles : 0,

    parseOperations : 0

};

/*=========================================================
Logger
=========================================================*/

function log(...message){

    if(configuration.debug){

        
    }

}

/*=========================================================
Markdown Parser
=========================================================*/

function parse(markdown){

    statistics.parseOperations++;

    if(

        typeof markdown !== "string"

    ){

        return "";

    }

    let html = markdown;

    /*-----------------------------------------------------
      Escape
    -----------------------------------------------------*/

    html = html.replace(

        /\r\n/g,

        "\n"

    );

    /*-----------------------------------------------------
      Headings
    -----------------------------------------------------*/

    html = html.replace(

        /^###### (.*)$/gm,

        "<h6>$1</h6>"

    );

    html = html.replace(

        /^##### (.*)$/gm,

        "<h5>$1</h5>"

    );

    html = html.replace(

        /^#### (.*)$/gm,

        "<h4>$1</h4>"

    );

    html = html.replace(

        /^### (.*)$/gm,

        "<h3>$1</h3>"

    );

    html = html.replace(

        /^## (.*)$/gm,

        "<h2>$1</h2>"

    );

    html = html.replace(

        /^# (.*)$/gm,

        "<h1>$1</h1>"

    );

    /*-----------------------------------------------------
      Bold
    -----------------------------------------------------*/

    html = html.replace(

        /\*\*(.*?)\*\*/g,

        "<strong>$1</strong>"

    );

    /*-----------------------------------------------------
      Italic
    -----------------------------------------------------*/

    html = html.replace(

        /\*(.*?)\*/g,

        "<em>$1</em>"

    );

    /*-----------------------------------------------------
      Links
    -----------------------------------------------------*/

    html = html.replace(

        /\[(.*?)\]\((.*?)\)/g,

        '<a href="$2">$1</a>'

    );

    /*-----------------------------------------------------
      Images
    -----------------------------------------------------*/

    html = html.replace(

        /!\[(.*?)\]\((.*?)\)/g,

        '<img src="$2" alt="$1">'

    );

    /*-----------------------------------------------------
      Horizontal Rule
    -----------------------------------------------------*/

    html = html.replace(

        /^---$/gm,

        "<hr>"

    );

    /*-----------------------------------------------------
      Blockquotes
    -----------------------------------------------------*/

    html = html.replace(

        /^> (.*)$/gm,

        "<blockquote>$1</blockquote>"

    );

    /*-----------------------------------------------------
      Paragraphs
    -----------------------------------------------------*/

    html = html.replace(

        /^(?!<h|<ul|<ol|<li|<img|<blockquote|<hr)(.+)$/gm,

        "<p>$1</p>"

    );

    return html;

}

/*=========================================================
Render
=========================================================*/

function render(container,markdown){

    const element =

        typeof container === "string"

            ? document.querySelector(

                container

            )

            : container;

    if(!element){

        state.failed++;

        return false;

    }

    const html = parse(markdown);

    element.innerHTML = `

    <section class="tool-article">

    ${html}

</section>

`;

    element.innerHTML = html;

    log(
    "Rendered article into",
    element
    );

    
    if (
    configuration.animate &&
    element instanceof HTMLElement
) {
    element.classList.add(
        "tx-article-loaded"
    );
}

    state.rendered++;

    statistics.renderedArticles++;

    state.lastUpdated = Date.now();

    return true;

}

/*=========================================================
Render Complete Article
=========================================================*/

function renderArticle(container, article){


    if(!article){

        return false;

    }

    let markdown = "";

    if(article.title){

        markdown += "# " + article.title + "\n\n";

    }

    if(article.introduction){

        markdown += article.introduction + "\n\n";

    }

    if(Array.isArray(article.sections)){

        article.sections.forEach(function(section){

            markdown +=
                "## " + section.heading + "\n\n";

            markdown +=
                section.content + "\n\n";

        });

    }

    return render(

        container,

        markdown

    );

}

/*=========================================================
Clear
=========================================================*/

function clear(container){

    const element =

        typeof container === "string"

            ? document.querySelector(

                container

            )

            : container;

    if(element){

        element.innerHTML = "";

    }

}

/*=========================================================
Refresh
=========================================================*/

function refresh(container,markdown){

    clear(

        container

    );

    return render(

        container,

        markdown

    );

}

/*=========================================================
Initialize
=========================================================*/

function initialize(){

    if(state.initialized){

        return;

    }

    state.initialized = true;

    state.lastUpdated = Date.now();

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
Console Report
=========================================================*/

function report(){

    console.group(

        RENDERER_NAME

    );

}

/*=========================================================
Public API
=========================================================*/

window.ToolXoneArticleRenderer = {

    name : RENDERER_NAME,

    version : RENDERER_VERSION,

    configuration,

    state,

    statistics,

    initialize,

    parse,

    render,

    renderArticle,

    clear,

    refresh,

    info,

    report

};

/*=========================================================
Auto Initialize
=========================================================*/

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