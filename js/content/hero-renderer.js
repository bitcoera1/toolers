/*
==========================================================
 ToolXone Hero Renderer
 Professional Hero Rendering Engine
 Version: 1.0.0
==========================================================
*/

(function(){

"use strict";

const NAME = "ToolXone Hero Renderer";

const VERSION = "1.0.0";

const configuration = {

    containerId : "toolHero",

    autoInitialize : true,

    debug : false

};

const state = {

    initialized : false,

    rendered : false,

    currentTool : null

};

const statistics = {

    renders : 0,

    failed : 0

};

/*==========================================================
Get Hero Data
==========================================================*/

function getHero(tool){

    if(

        !window.ToolXoneContentRegistry

    ){

        return null;

    }

    return window.ToolXoneContentRegistry.get(

        "hero",

        tool

    );

}

/*==========================================================
Find Container
==========================================================*/

function getContainer(){

    return document.getElementById(

        configuration.containerId

    );

}

/*==========================================================
Escape HTML
==========================================================*/

function escapeHTML(value){

    if(value === null || value === undefined){

        return "";

    }

    return String(value)

        .replace(/&/g,"&amp;")

        .replace(/</g,"&lt;")

        .replace(/>/g,"&gt;")

        .replace(/"/g,"&quot;")

        .replace(/'/g,"&#039;");

}

/*==========================================================
Highlight List
==========================================================*/

function renderHighlights(list){

    if(

        !Array.isArray(list)

    ){

        return "";

    }

    return list.map(function(item){

        return `
<li class="tx-hero-highlight">

<span>✔</span>

${escapeHTML(item)}

</li>
`;

    }).join("");

}

/*==========================================================
Build Hero HTML
==========================================================*/

function buildHero(hero){

    if(!hero){

        return "";

    }

return `

<div class="tx-tool-hero">

    <div class="tx-tool-hero-content">

        <div class="tx-tool-hero-header">

            <div class="tx-tool-badge">

                ${escapeHTML(hero.badge || "")}

            </div>

            <div class="tx-tool-category">

                ${escapeHTML(hero.category || "")}

            </div>

        </div>

        <div class="tx-tool-title">

            ${escapeHTML(hero.icon || "")}

            ${escapeHTML(hero.title || "")}

        </div>

        <div class="tx-tool-subtitle">

            ${escapeHTML(hero.subtitle || "")}

        </div>

        <div class="tx-tool-description">

            ${escapeHTML(hero.description || "")}

        </div>

        <div class="tx-tool-highlights">

            <ul>

                ${renderHighlights(hero.highlights)}

            </ul>

        </div>

        <div class="tx-tool-statistics">

            <div class="tx-tool-stat">

                <strong>${escapeHTML(hero.statistics?.functions || "")}</strong>

                <span>Functions</span>

            </div>

            <div class="tx-tool-stat">

                <strong>${escapeHTML(hero.statistics?.accuracy || "")}</strong>

                <span>Accuracy</span>

            </div>

            <div class="tx-tool-stat">

                <strong>${escapeHTML(hero.statistics?.availability || "")}</strong>

                <span>Availability</span>

            </div>

            <div class="tx-tool-stat">

                <strong>${escapeHTML(hero.statistics?.price || "")}</strong>

                <span>Price</span>

            </div>

        </div>

        <div class="tx-tool-actions">

      <button class="tx-primary-button">

    ${escapeHTML(hero.cta?.primary || "Start")}

</button>

<button class="tx-secondary-button">

    ${escapeHTML(hero.cta?.secondary || "Learn More")}

</button>

        </div>

    </div>

    <div class="tx-tool-hero-preview">

        ${hero.preview || ""}

    </div>

</div>

`;

}

/*==========================================================
Render Hero
==========================================================*/

function render(tool){

    const container = getContainer();

    if(!container){

        statistics.failed++;

        return false;

    }

    const hero = getHero(tool);

    if(!hero){

        statistics.failed++;

        return false;

    }

    container.innerHTML = buildHero(hero);

    state.currentTool = tool;

    state.rendered = true;

    statistics.renders++;

    state.lastRendered = Date.now();

    return true;

}

/*==========================================================
Refresh
==========================================================*/

function refresh(){

    if(

        !state.currentTool

    ){

        return false;

    }

    return render(

        state.currentTool

    );

}

/*==========================================================
Clear
==========================================================*/

function clear(){

    const container = getContainer();

    if(

        container

    ){

        container.innerHTML = "";

    }

    state.rendered = false;

    state.currentTool = null;

    return true;

}

/*==========================================================
Initialize
==========================================================*/

function initialize(){

    if(state.initialized){

        return true;

    }

    state.initialized = true;

    const tool = document.body.dataset.tool;

    if(tool){

        render(tool);

    }

    return true;

}

/*==========================================================
Information
==========================================================*/

function info(){

    return {

        name : NAME,

        version : VERSION,

        configuration,

        state,

        statistics

    };

}

/*==========================================================
Console Report
==========================================================*/

function report(){

    console.group(NAME);

    console.log(

        "Version:",

        VERSION

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

        "Current Tool:",

        state.currentTool

    );

    console.log(

        "Renders:",

        statistics.renders

    );

    console.log(

        "Failed:",

        statistics.failed

    );

    console.groupEnd();

}

/*==========================================================
Public API
==========================================================*/

window.ToolXoneHeroRenderer = {

    name : NAME,

    version : VERSION,

    initialize,

    render,

    refresh,

    clear,

    info,

    report,

    configuration,

    state,

    statistics

};

/*==========================================================
Auto Initialize
==========================================================*/

if(

    configuration.autoInitialize

){

    initialize();

}

console.info(

    NAME +

    " v" +

    VERSION +

    " initialized"

);

})();