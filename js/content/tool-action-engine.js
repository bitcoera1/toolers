/*
=========================================================
ToolXone Action Engine
Version 1.1.0
Tool-aware CTA action system
=========================================================
*/

(function(){

"use strict";


/*=========================================================
Constants
=========================================================*/

const NAME = "ToolXone Action Engine";

const VERSION = "1.1.0";


/*=========================================================
Configuration
=========================================================*/

const configuration = {

    smooth : true,

    autoInitialize : true,

    /*
    ---------------------------------------------------------
    Tool-specific action targets
    ---------------------------------------------------------
    */

    actions : {

    basic : {

        startCalculating : ".tx-calculator-section",

        learnMore : "#financeInfo"

    },

    scientific : {

        startCalculating : ".scientific-card",

        learnMore : "#financeInfo"

    },

    "scientific-calculator" : {

        startCalculating : ".scientific-card",

        learnMore : "#financeInfo"

    }

}

};


/*=========================================================
State
=========================================================*/

const state = {

    initialized : false,

    currentTool : null

};


/*=========================================================
Get Current Tool
=========================================================*/

function getCurrentTool(){

    const tool = document.body.dataset.tool;

    if(!tool){

        return null;

    }

    return tool;

}


/*=========================================================
Get Tool Actions
=========================================================*/

function getToolActions(tool){

    if(!tool){

        return null;

    }

    return configuration.actions[tool] || null;

}


/*=========================================================
Resolve Action Target
=========================================================*/

function resolveTarget(action){

    const tool = getCurrentTool();

    if(!tool){

        return null;

    }

    state.currentTool = tool;

    const toolActions = getToolActions(tool);

    if(!toolActions){

        return null;

    }

    return toolActions[action] || null;

}


/*=========================================================
Scroll Helper
=========================================================*/

function scrollTo(selector){

    if(!selector){

        return false;

    }

    const element = document.querySelector(selector);

    if(!element){

        console.warn(

            NAME +

            ": Target not found:",

            selector

        );

        return false;

    }

    element.scrollIntoView({

        behavior : configuration.smooth
            ? "smooth"
            : "auto",

        block : "start"

    });

    return true;

}


/*=========================================================
Primary Action
=========================================================*/

function startCalculating(){

    const target = resolveTarget(

        "startCalculating"

    );

    return scrollTo(target);

}


/*=========================================================
Secondary Action
=========================================================*/

function learnMore(){

    const target = resolveTarget(

        "learnMore"

    );

    return scrollTo(target);

}


/*=========================================================
Execute Action
=========================================================*/

function executeAction(action){

    if(action === "startCalculating"){

        return startCalculating();

    }

    if(action === "learnMore"){

        return learnMore();

    }

    console.warn(

        NAME +

        ": Unknown action:",

        action

    );

    return false;

}


/*=========================================================
Initialize
=========================================================*/

function initialize(){

    if(state.initialized){

        return;

    }

    state.currentTool = getCurrentTool();


    document.addEventListener(

        "click",

        function(event){

            const button = event.target.closest(

                ".tx-primary-button, .tx-secondary-button"

            );


            if(!button){

                return;

            }


            if(

                button.classList.contains(

                    "tx-primary-button"

                )

            ){

                executeAction(

                    "startCalculating"

                );

            }


            if(

                button.classList.contains(

                    "tx-secondary-button"

                )

            ){

                executeAction(

                    "learnMore"

                );

            }

        }

    );


    state.initialized = true;

}


/*=========================================================
Public API
=========================================================*/

window.ToolXoneActionEngine = {

    initialize,

    startCalculating,

    learnMore,

    executeAction,

    getCurrentTool,

    getToolActions,

    resolveTarget,

    configuration,

    state,

    name : NAME,

    version : VERSION

};


/*=========================================================
Auto Initialize
=========================================================*/

if(configuration.autoInitialize){

    initialize();

}


console.info(

    NAME +

    " v" +

    VERSION +

    " initialized"

);

})();