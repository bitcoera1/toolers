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

actions : {

    /*
    =========================================================
      Universal Default Action Targets
    =========================================================

      Most ToolXone calculator/converter pages use the
      standard calculator section and finance information
      section.

      Individual tools can override these defaults below.
    =========================================================
    */

    default : {

        startCalculating : ".tx-calculator-section",

        learnMore : "#financeInfo"

    },


    /*
    =========================================================
      Tool-Specific Overrides
    =========================================================
    */

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

    },


    "bmi-calculator" : {

        startCalculating : ".bmi-card",

        learnMore : "#financeInfo"

    },


    "currency" : {

        startCalculating : ".tool-page .container",

        learnMore : "#financeInfo"

    },

    loan : {

        startCalculating : ".loan-page",

        learnMore : "#financeInfo"

    },

    "loan-calculator" : {

        startCalculating : ".loan-page",

        learnMore : "#financeInfo"

    },

    mortgage : {

    startCalculating : ".mortgage-card",

    learnMore : "#financeInfo"

},

"mortgage-calculator" : {

    startCalculating : ".mortgage-card",

    learnMore : "#financeInfo"

},

    emi : {

        startCalculating : ".emi-card",

        learnMore : "#financeInfo"

    },

    "compound-interest-calculator": {

        startCalculating: ".compound-card",

        learnMore: "#financeInfo"

    },

    "weight-converter" : {
    
        startCalculating : ".tool-area",
    
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

    /*
    =========================================================
      Tool-Specific Configuration
    =========================================================

      If a tool has its own configuration, use it.
    =========================================================
    */

    if(configuration.actions[tool]){

        return configuration.actions[tool];

    }


    /*
    =========================================================
      Universal Default Configuration
    =========================================================

      Tools without a special configuration automatically
      receive the standard ToolXone Hero actions.
    =========================================================
    */

    return configuration.actions.default || null;

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

    /*
    ---------------------------------------------------------
    Sticky navigation offset
    ---------------------------------------------------------
    ToolXone navbar uses position: sticky.

    scrollIntoView() places the target at viewport top,
    which can hide it underneath the sticky navbar.

    Measure the navbar dynamically instead of using
    a hard-coded height.
    ---------------------------------------------------------
    */

    const navbar =
        document.getElementById("navbar");

    const navbarHeight =
        navbar
            ? navbar.getBoundingClientRect().height
            : 0;

    const scrollGap = 16;

    const targetY =
        element.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight -
        scrollGap;

    window.scrollTo({

        top: Math.max(0, targetY),

        behavior : configuration.smooth
            ? "smooth"
            : "auto"

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