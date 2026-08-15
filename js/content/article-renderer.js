/*
==========================================================
 ToolXone Article Renderer
 Dynamic Markdown Rendering Platform
 Version: 1.1.0
==========================================================
*/

(function(){

"use strict";

/*=========================================================
Constants
=========================================================*/

const RENDERER_NAME = "ToolXone Article Renderer";

const RENDERER_VERSION = "1.1.0";

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
Markdown Parser
=========================================================*/

function parse(markdown) {

    statistics.parseOperations++;

    if (typeof markdown !== "string") {
        return "";
    }

    let source = markdown;

    /* -----------------------------------------------------
       NORMALIZE LINE ENDINGS
    ----------------------------------------------------- */

    source = source.replace(/\r\n/g, "\n");
    source = source.replace(/\r/g, "\n");


    /* -----------------------------------------------------
       PROCESS MARKDOWN TEXT
       -----------------------------------------------------
       Important:
       - Consecutive normal text lines become ONE paragraph.
       - Headings remain headings.
       - HTML blocks are never passed through paragraph
         conversion.
    ----------------------------------------------------- */

    function processMarkdownText(text) {

        const lines = text.split("\n");
        const output = [];

        let paragraphLines = [];
        let blockquoteLines = [];

        function flushParagraph() {

            if (!paragraphLines.length) {
                return;
            }

            const paragraph = paragraphLines
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            if (paragraph) {
                output.push("<p>" + paragraph + "</p>");
            }

            paragraphLines = [];
        }


        function flushBlockquote() {

            if (!blockquoteLines.length) {
                return;
            }

            const quote = blockquoteLines
                .join(" ")
                .replace(/\s+/g, " ")
                .trim();

            if (quote) {
                output.push(
                    "<blockquote>" +
                    quote +
                    "</blockquote>"
                );
            }

            blockquoteLines = [];
        }


        lines.forEach(function(line) {

            const trimmed = line.trim();


            /* ---------------------------------------------
               EMPTY LINE
               --------------------------------------------- */

            if (!trimmed) {

                flushParagraph();
                flushBlockquote();

                return;
            }


            /* ---------------------------------------------
               BLOCKQUOTE
               --------------------------------------------- */

            if (/^>\s?/.test(trimmed)) {

                flushParagraph();

                blockquoteLines.push(
                    trimmed.replace(/^>\s?/, "")
                );

                return;
            }


            /* ---------------------------------------------
               HEADINGS
               --------------------------------------------- */

            let match;


            match = trimmed.match(/^###### (.*)$/);

            if (match) {

                flushParagraph();
                flushBlockquote();

                output.push(
                    "<h6>" + match[1] + "</h6>"
                );

                return;
            }


            match = trimmed.match(/^##### (.*)$/);

            if (match) {

                flushParagraph();
                flushBlockquote();

                output.push(
                    "<h5>" + match[1] + "</h5>"
                );

                return;
            }


            match = trimmed.match(/^#### (.*)$/);

            if (match) {

                flushParagraph();
                flushBlockquote();

                output.push(
                    "<h4>" + match[1] + "</h4>"
                );

                return;
            }


            match = trimmed.match(/^### (.*)$/);

            if (match) {

                flushParagraph();
                flushBlockquote();

                output.push(
                    "<h3>" + match[1] + "</h3>"
                );

                return;
            }


            match = trimmed.match(/^## (.*)$/);

            if (match) {

                flushParagraph();
                flushBlockquote();

                output.push(
                    "<h2>" + match[1] + "</h2>"
                );

                return;
            }


            match = trimmed.match(/^# (.*)$/);

            if (match) {

                flushParagraph();
                flushBlockquote();

                output.push(
                    "<h1>" + match[1] + "</h1>"
                );

                return;
            }


            /* ---------------------------------------------
               HORIZONTAL RULE
               --------------------------------------------- */

            if (/^---+$/.test(trimmed)) {

                flushParagraph();
                flushBlockquote();

                output.push("<hr>");

                return;
            }


            /* ---------------------------------------------
               NORMAL TEXT
               --------------------------------------------- */

            flushBlockquote();

            paragraphLines.push(trimmed);

        });


        flushParagraph();
        flushBlockquote();


        return output.join("\n");
    }


    /* -----------------------------------------------------
       EXTRACT RAW HTML BLOCKS
       -----------------------------------------------------
       This is the important part.

       Rich ToolXone articles contain HTML such as:

           <div class="loan-info-grid">
               <div class="loan-info-box">
                   ...
               </div>
           </div>

       Those blocks must NEVER be converted into paragraphs.
    ----------------------------------------------------- */

    const lines = source.split("\n");

    const chunks = [];

    let markdownBuffer = [];

    let htmlBuffer = [];

    let htmlDepth = 0;

    let inHtmlBlock = false;


    function flushMarkdownBuffer() {

        if (!markdownBuffer.length) {
            return;
        }

        const text = markdownBuffer.join("\n");

        if (text.trim()) {

            chunks.push({
                type: "markdown",
                content: text
            });

        }

        markdownBuffer = [];
    }


    function flushHtmlBuffer() {

        if (!htmlBuffer.length) {
            return;
        }

        chunks.push({
            type: "html",
            content: htmlBuffer.join("\n")
        });

        htmlBuffer = [];
        htmlDepth = 0;
        inHtmlBlock = false;
    }


    function calculateHtmlDepth(line) {

        let depth = 0;

        const tagPattern =
            /<\s*(\/?)\s*([a-zA-Z][\w:-]*)\b[^>]*>/g;

        let match;

        while ((match = tagPattern.exec(line)) !== null) {

            const closing = match[1] === "/";
            const tagName = match[2].toLowerCase();

            const voidTags = [
                "area",
                "base",
                "br",
                "col",
                "embed",
                "hr",
                "img",
                "input",
                "link",
                "meta",
                "param",
                "source",
                "track",
                "wbr"
            ];

            if (voidTags.includes(tagName)) {
                continue;
            }

            if (closing) {
                depth--;
            } else {
                depth++;
            }
        }

        return depth;
    }


    lines.forEach(function(line) {

        const trimmed = line.trim();


        /* -------------------------------------------------
           ALREADY INSIDE HTML BLOCK
           ------------------------------------------------- */

        if (inHtmlBlock) {

            htmlBuffer.push(line);

            htmlDepth += calculateHtmlDepth(line);

            if (htmlDepth <= 0) {
                flushHtmlBuffer();
            }

            return;
        }


        /* -------------------------------------------------
           HTML BLOCK START
           -------------------------------------------------
           We intentionally allow indentation before <tag>.
        ------------------------------------------------- */

        const startsWithHtmlTag =
            /^\s*<(?:[a-zA-Z][\w:-]*|\/?[a-zA-Z][\w:-]*|!--|!DOCTYPE\b)/.test(line);


        if (startsWithHtmlTag) {

            flushMarkdownBuffer();

            htmlBuffer.push(line);

            htmlDepth = calculateHtmlDepth(line);

            /*
             * Self-contained HTML such as:
             *
             * <p>Hello</p>
             * <div>...</div>
             * <img ...>
             *
             * can finish immediately.
             */

            if (htmlDepth <= 0) {
                flushHtmlBuffer();
            } else {
                inHtmlBlock = true;
            }

            return;
        }


        /* -------------------------------------------------
           NORMAL MARKDOWN
        ------------------------------------------------- */

        markdownBuffer.push(line);

    });


    flushMarkdownBuffer();

    if (inHtmlBlock) {
        flushHtmlBuffer();
    }


    /* -----------------------------------------------------
       RENDER CHUNKS
    ----------------------------------------------------- */

    let html = "";


    chunks.forEach(function(chunk) {

        if (chunk.type === "html") {

            /*
             * Preserve HTML EXACTLY as supplied.
             */
            html += chunk.content + "\n";

            return;
        }


        if (chunk.type === "markdown") {

            let text = chunk.content;


            /* ---------------------------------------------
               IMAGES
               --------------------------------------------- */

            text = text.replace(
                /!\[(.*?)\]\((.*?)\)/g,
                `<img
                    src="$2"
                    alt="$1"
                    loading="lazy">`
            );


            /* ---------------------------------------------
               LINKS
               --------------------------------------------- */

            text = text.replace(
                /\[(.*?)\]\((.*?)\)/g,
                `<a
                    href="$2"
                    target="_blank"
                    rel="noopener noreferrer">$1</a>`
            );


            /* ---------------------------------------------
               BOLD
               --------------------------------------------- */

            text = text.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
            );


            /* ---------------------------------------------
               ITALIC
               --------------------------------------------- */

            text = text.replace(
                /\*(.*?)\*/g,
                "<em>$1</em>"
            );


            html += processMarkdownText(text) + "\n";

        }

    });


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

    if(

        configuration.animate &&

        element instanceof HTMLElement

    ){

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
Render Raw HTML
=========================================================*/

function renderHTML(container, html){

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


    element.innerHTML = `

        <section class="tool-article">

            ${html}

        </section>

    `;


    if(

        configuration.animate &&

        element instanceof HTMLElement

    ){

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


    /*=========================================================
      RAW HTML ARTICLE
      ---------------------------------------------------------
      Used for rich educational articles that contain:
      - custom HTML
      - contextual links
      - grids
      - cards
      - formulas
      - lists
      - custom ToolXone article components
    =========================================================*/

    if(
        typeof article.html === "string" &&
        article.html.trim()
    ){

        return renderHTML(
            container,
            article.html
        );

    }


    /*=========================================================
      STANDARD MARKDOWN ARTICLE
      ---------------------------------------------------------
      Existing content-data files continue to work exactly
      as before.
    =========================================================*/

    let markdown = "";

    if(article.title){

        markdown +=
            "# " +
            article.title +
            "\n\n";

    }

    if(article.introduction){

        markdown +=
            article.introduction +
            "\n\n";

    }

    if(Array.isArray(article.sections)){

        article.sections.forEach(function(section){

            markdown +=
                "## " +
                section.heading +
                "\n\n";

            markdown +=
                section.content +
                "\n\n";

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

    console.log(

        "Version:",

        RENDERER_VERSION

    );

    console.log(

        "Configuration:",

        configuration

    );

    console.log(

        "State:",

        state

    );

    console.log(

        "Statistics:",

        statistics

    );

    console.groupEnd();

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

    renderHTML,

    renderArticle,

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

    RENDERER_NAME +

    " v" +

    RENDERER_VERSION +

    " initialized"

);

})();